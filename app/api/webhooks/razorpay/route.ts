// import type {  } from 'razorpay'
import connectDB from "@/lib/dbConnection";
import { logger } from "@/lib/logger";
import { Order, Subscription, User } from "@/models";
import { SubscriptionStatus } from "@/types/subscription";
import Razorpay from "razorpay";
import { Orders } from "razorpay/dist/types/orders";
import { Payments } from "razorpay/dist/types/payments";


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

        const meta = orderEntity.notes as {
            plans: string;
            userId: string;
            customerId: string;
        };

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
                { customerId: meta.customerId }
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
            )
        ])

        return new Response("Webhook processed", { status: 200 });
    } catch (error) {
        logger.error("🔔❌ Webhook processing failed:", error);
        return new Response("Webhook processing failed", { status: 500 });
    }
}