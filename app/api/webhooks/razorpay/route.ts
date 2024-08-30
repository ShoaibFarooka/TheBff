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
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

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

    // disable for now
    if (!body.event?.startsWith("subscription.")) {
      productionLogger.log(`🔔❌ Irrelevant event: ${body.event}`);
      return new Response("Irrelevant event", { status: 200 });
    }

    const subscription = body.payload.subscription.entity as Subscriptions.RazorpaySubscription;
    const meta = subscription.notes as {
      email: string,
      phone: string,
      programId: string
    };

    // process simultaneously
    await Promise.all([
      // update the customer
      User.updateOne(
        { email: meta.email },
        { razorpayCustomerId: subscription.customer_id }
      ),

      // save the subscription
      Subscription.updateOne(
        { id: subscription.id },
        { ...subscription, programId: meta.programId },
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

// export const GET = async () => {
//   // create a new plan
//   const razorpay = new Razorpay({
//     key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
//     key_secret: process.env.RAZORPAY_KEY_SECRET || "",
//   });

//   // const res = await razorpay.plans.create({ ...plan })

//   // return new Response(JSON.stringify(res), { status: 200 })
// };


// // handle the event
// switch (body.event) {
//     case 'subscription.charged':
//         // handle subscription charged event
//         break;
//     case 'subscription.activated':
//         // handle subscription activated event
//         await Subscription.findOneAndUpdate(
//             { id: subscription.id },
//             subscription
//         )
//         break;
//     case 'subscription.pending':
//         // handle subscription pending event
//         break;
//     case 'subscription.halted':
//         // handle subscription halted event
//         break;
//     default:
//         console.log(`🔔❌ Unhandled event: ${body.event}`)
//         return new Response('Unhandled event', { status: 200 })
// }
