// import type {  } from 'razorpay'
import { devLog } from "@/lib/helpers";
import { razorpay } from "@/lib/subscription";
import { Plan as PlanModel, Subscription, User } from "@/models";
import { Plan } from "@/types/subscription";
import Razorpay from "razorpay";

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

    // console woth a right tick mark
    devLog(`✅ Webhook signature is valid: ${isValid}`);

    if (!isValid) {
      devLog("❌ Invalid webhook signature.");
      return new Response("Invalid signature", { status: 400 });
    }

    if (!relevantEvents.has(body.event)) {
      devLog(`🔔❌ Irrelevant event: ${body.event}`);
      return new Response("Irrelevant event", { status: 200 });
    }

    devLog(`🔔 Webhook received: ${body.event}`);

    const subscription = body.payload.subscription.entity;

    const customerId = subscription.customer_id;

    const customer = await razorpay.customers.fetch(customerId);
    if (!customer) {
      devLog(`❌ Customer not found: ${customerId}`);
      return new Response(`Customer not found: ${customerId}`, { status: 404 });
    }

    const plan = (await PlanModel.findOne(
      { id: subscription.plan_id },
      "-_id programId"
    ).lean()) as Pick<Plan, "programId">;
    
    // process simultaneously
    await Promise.all([
      // update the customer
      await User.findOneAndUpdate(
        { email: customer.email },
        { razorpayCustomerId: customer.id }
      ),

      // save the subscription
      await Subscription.findOneAndUpdate(
        { id: subscription.id },
        { ...subscription, programId: plan.programId },
        {
          upsert: true,
        }
      ),
    ]);

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

    return new Response("Webhook received", { status: 200 });
  } catch (err: any) {
    console.error(`❌ Webhook Error:`, err);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
}

// export const GET = async () => {
//   // create a new plan
//   const razorpay = new Razorpay({
//     key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
//     key_secret: process.env.RAZORPAY_KEY_SECRET || "",
//   });

//   // const res = await razorpay.plans.create({ ...plan })

//   // return new Response(JSON.stringify(res), { status: 200 })
// };
