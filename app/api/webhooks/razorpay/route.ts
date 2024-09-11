// import type {  } from 'razorpay'
import connectDB from "@/lib/dbConnection";
import { sendEmail } from "@/lib/email";
import { logger, prodLogger } from "@/lib/logger";
import { adminNotificationTemplate, subscriptionConfirmationTemplate } from "@/lib/templates/subscriptionConfirmation";
import { Order, Subscription, User } from "@/models";
import { Plan as PlanType, SubscriptionStatus, Subscription as SubscriptionType } from "@/types/subscription";
import { User as UserType } from "@/types/user";
import Razorpay from "razorpay";
import { Orders } from "razorpay/dist/types/orders";
import { Payments } from "razorpay/dist/types/payments";

interface Meta {
    plans: string;
    userId: string;
    customerId: string;
}

const relevantEvents = new Set([
    "order.paid"
]);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const secret = process.env.RAZORPAY_SECRET;

        const isValid = Razorpay.validateWebhookSignature(
            JSON.stringify(body),
            req.headers.get("X-Razorpay-Signature") || "",
            secret || ""
        );

        if (!isValid) {
            logger.log("❌ Invalid webhook signature.");
            return new Response("Invalid signature", { status: 400 });
        }
        logger.log("🔔 Webhook received:", body.event);

        if (!relevantEvents.has(body.event)) {
            logger.log(`🔔❌ Irrelevant event: ${body.event}`);
            return new Response("Irrelevant event", { status: 200 });
        }

        const orderEntity = body.payload.order.entity as Orders.RazorpayOrder;
        const paymentEntity = body.payload.payment.entity as Payments.RazorpayPayment;

        const meta = orderEntity.notes as unknown as Meta;

        // update subscription status
        const planIds = meta.plans.split(",").map(id => id.trim());

        const order = {
            ...orderEntity,
            payment: paymentEntity
        }

        await connectDB();

        // update subscription status to active
        await Promise.all([
            User.updateOne(
                { _id: meta.userId },
                { razorpayCustomerId: meta.customerId }
            ),
            Subscription.updateMany({
                userId: meta.userId,
                planId: { $in: planIds },
                status: SubscriptionStatus.pending
            }, {
                status: SubscriptionStatus.active
            }),
            Order.updateOne(
                { id: order.id }, // order id
                order,
                { upsert: true }
            ),
            sendConfirmationEmails(order, meta)
        ])

        return new Response("Webhook processed", { status: 200 });
    } catch (error) {
        logger.error("🔔❌ Webhook processing failed:", error);
        return new Response("Webhook processing failed", { status: 500 });
    }
}

async function sendConfirmationEmails(
    order: Orders.RazorpayOrder,
    meta: Meta
) {
    try {
        await connectDB();

        const [subscriptions, user] = await Promise.all([
            Subscription
                .find({
                    planId: { $in: meta.plans.split(",").map(id => id.trim()) },
                    userId: meta.userId,
                })
                .populate<PlanType>("plan")
                .lean<Array<SubscriptionType & { plan: PlanType }>>(),
            User
                .findOne({ _id: meta.userId }).lean<UserType>()
        ])

        if (!user || !subscriptions.length) {
            return;
        }

        const formattedPlans = subscriptions.map(sub => ({
            name: sub.plan.name,
            amount: sub.plan.amount ?? 0,
            startDate: (sub.startDate as Date).toLocaleDateString('en-In', { year: 'numeric', month: 'short', day: 'numeric' }), // 01 Jan 2022 
            endDate: (sub.endDate as Date).toLocaleDateString('en-In', { year: 'numeric', month: 'short', day: 'numeric' })
        }))

        const userEmailPromise = sendEmail({
            from: `TheBFF Subscriptions <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Your order(s) has been confirmed",
            text: `Your order has been confirmed.`,
            html: subscriptionConfirmationTemplate({
                plans: formattedPlans,
                totalAmount: order.amount as number
            })
        })

        const adminEmailPromise = sendEmail({
            from: `TheBFF Subscriptions <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER!,
            subject: "New subscription order",
            text: `New subscription order`,
            html: adminNotificationTemplate({
                user,
                plans: formattedPlans,
                totalAmount: order.amount as number
            })
        })

        await Promise.all([userEmailPromise, adminEmailPromise]);

    } catch (error) {
        prodLogger.error("Failed to send confirmation emails", error);
    }
}