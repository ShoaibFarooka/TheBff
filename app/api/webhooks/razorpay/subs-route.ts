// import type {  } from 'razorpay'
import { Logger, logger } from "@/lib/logger";
import { Subscription, User } from "@/models";
import Razorpay from "razorpay";
import { Subscriptions } from "razorpay/dist/types/subscriptions";

const productionLogger = new Logger()

// razorpay webhook
const relevantEvents = new Set([
  "subscription.charged",
  "subscription.activated",
  "subscription.charged",
  "subscription.pending",
  "subscription.halted",
  "subscription.cancelled",
  "subscription.expired",

  // 'subscription.paused',
  // 'subscription.resumed',
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

    if (!body.event?.startsWith("subscription.")) {
      productionLogger.log(`🔔❌ Irrelevant event: ${body.event}`);
      return new Response("Irrelevant event", { status: 200 });
    }

    const subscription = body.payload.subscription.entity as Subscriptions.RazorpaySubscription;
    const meta = subscription.notes as {
      email: string,
      phone: string,
      programId: string,
      customer_id: string,
    };

    const customer_id = subscription.customer_id || meta.customer_id;


    // process simultaneously
    await Promise.all([
      // update the customer
      User.updateOne(
        { email: meta.email },
        { razorpayCustomerId: customer_id }
      ),

      // save the subscription
      Subscription.updateOne(
        { id: subscription.id },
        { ...subscription, programId: meta.programId, customer_id },
        {
          upsert: true,
        }
      ),
    ]);

    return new Response("Webhook received", { status: 200 });
  } catch (err: any) {
    productionLogger.error(`❌ Webhook Error:`, err);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
}

// Page configs
export const dynamic = 'force-dynamic'
export const maxDuration = 60; // 1 minute
