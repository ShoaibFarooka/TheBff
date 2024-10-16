// import type {  } from 'razorpay'
import { generatePassword } from "@/lib/auth";
import connectDB from "@/lib/dbConnection";
import { sendEmail } from "@/lib/email";
import { paymentConfirmationTemplate } from "@/lib/email/templates/paymentConfirmation";
import { adminNotificationTemplate, subscriptionConfirmationTemplate } from "@/lib/email/templates/subscriptionConfirmation";
import { logger, prodLogger } from "@/lib/logger";
import { safePromise } from "@/lib/utils";
import { Order, Subscription, User } from "@/models";
import { Plan as PlanType, SubscriptionStatus, Subscription as SubscriptionType } from "@/types/subscription";
import { User as UserType } from "@/types/user";
import { NextResponse } from "next/server";
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
        if(body?.event !== "payment_link.paid"){
            return new Response("Event Not Recognised", { status: 400 });
        }
        console.log("body", body)
        console.log("body?.payload?.payment_link", body?.payload?.payment_link)
        console.log("body?.payload?.payment_link?.entity", body?.payload?.payment_link?.entity)

        const referenceId = body?.payload?.payment_link?.entity?.reference_id;

        if (!referenceId) {
            return NextResponse.json({ success: false, message: "reference_id not found in the request" }, { status: 400 });
        }
        const subscription = await Subscription.findOne({ reference_id: referenceId });
        if (!subscription) {
            return NextResponse.json({ success: false, message: "Subscription not found" }, { status: 404 });
        }
        subscription.status = SubscriptionStatus.active ; // Or any other logic you'd like
        await subscription.save();

        const user = await User.findOne({_id: subscription?.userId})
        const password = generatePassword(user?.email!, user?.phone!)

        const promises = []
        promises.push(sendEmail({
            to: user?.email!,
            subject: "Payment Confirmation",
            html: paymentConfirmationTemplate({ plan: subscription?.programId, totalAmount: 1000, email: user?.email!, password: password! })
          }))

        return NextResponse.json({ success: true, message: "Subscription updated successfully" }, { status: 200 });
        
        // const secret = process.env.RAZORPAY_SECRET;

        // const isValid = Razorpay.validateWebhookSignature(
        //     JSON.stringify(body),
        //     req.headers.get("X-Razorpay-Signature") || "",
        //     secret || ""
        // );

        // if (!isValid) {
        //     logger.log("❌ Invalid webhook signature.");
        //     return new Response("Invalid signature", { status: 400 });
        // }
        // logger.log("🔔 Webhook received:", body.event);

        // if (!relevantEvents.has(body.event)) {
        //     logger.log(`🔔❌ Irrelevant event: ${body.event}`);
        //     return new Response("Irrelevant event", { status: 200 });
        // }

        // const orderEntity = body.payload.order.entity as Orders.RazorpayOrder;
        // const paymentEntity = body.payload.payment.entity as Payments.RazorpayPayment;

        // const meta = orderEntity.notes as unknown as Meta;

        // // update subscription status
        // const planIds = meta.plans.split(",").map(id => id.trim());

        // const order = {
        //     ...orderEntity,
        //     payment: paymentEntity
        // }

        // await connectDB();

        // // update subscription status to active
        // await Promise.all([
        //     User.updateOne(
        //         { _id: meta.userId },
        //         { razorpayCustomerId: meta.customerId }
        //     ),
        //     Subscription.updateMany({
        //         userId: meta.userId,
        //         planId: { $in: planIds },
        //         status: SubscriptionStatus.pending
        //     }, {
        //         status: SubscriptionStatus.active
        //     }),
        //     Order.updateOne(
        //         { id: order.id }, // order id
        //         order,
        //         { upsert: true }
        //     ),
        // ])

        // // send confirmation emails
        // safePromise( // ignore errors
        //     sendConfirmationEmails(order, meta)
        // )

        // return new Response("Webhook processed", { status: 200 });
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
        // Connect to the database
        await connectDB();

        // Fetch subscriptions and user details concurrently
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
        ]);

        // If no user or subscriptions found, exit the function
        if (!user || !subscriptions.length) {
            return;
        }

        const totalAmount = parseFloat(String(order.amount)) / 100;

        // Format subscription plans for email templates
        const formattedPlans = subscriptions.map(sub => ({
            name: sub.plan.name,
            amount: sub.plan.amount ? sub.plan.amount / 100 : 0,
            startDate: (sub.startDate as Date).toLocaleDateString('en-In', { year: 'numeric', month: 'short', day: 'numeric' }), // 01 Jan 2022 
            endDate: (sub.endDate as Date).toLocaleDateString('en-In', { year: 'numeric', month: 'short', day: 'numeric' })
        }));

        // Prepare user confirmation email
        const userEmailPromise = sendEmail({
            from: `TheBFF Subscriptions <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Your order(s) has been confirmed",
            text: `Your order has been confirmed.`,
            html: subscriptionConfirmationTemplate({
                plans: formattedPlans,
                totalAmount
            })
        });

        // Prepare admin notification email
        const adminEmailPromise = sendEmail({
            from: `TheBFF Subscriptions <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER!,
            subject: "New subscription order",
            text: `New subscription order`,
            html: adminNotificationTemplate({
                user,
                plans: formattedPlans,
                totalAmount
            })
        });

        // Send both emails concurrently
        await Promise.all([userEmailPromise, adminEmailPromise]);

    } catch (error) {
        // Log any errors encountered during the process
        prodLogger.error("Failed to send confirmation emails", error);
    }
}