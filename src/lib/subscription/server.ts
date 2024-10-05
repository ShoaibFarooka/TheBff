"use server";
import { Plan as PlanModel, Subscription, User } from "@/models";
import { authenticate } from "../auth";
import connectDB from "../dbConnection";
// import type { Plan as PlanType } from '@/types/subscription';
import { Program } from "@/types/program";
import { Plan } from "@/types/subscription";
import { unstable_cache as nextCache } from "next/cache";
import { Customers } from "razorpay/dist/types/customers";
import { razorpay } from ".";
import { logger } from "../logger";

export async function getUncachedPlans({ program }: { program?: string } = {}) {
  try {
    await connectDB();

    const query = {} as Record<string, any>;
    if (program) query['program'] = program;

    const plans = await PlanModel.find(query).lean();
    // console.log('plans', plans)

    return plans;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getPlans = nextCache(getUncachedPlans, ['plans'], {
  tags: ['plans'],
  // unvalidate every 3 hours (in seconds) = 3 * 60 * 60
  // in development mode, set to 5 seconds
  revalidate: process.env.NODE_ENV === 'development' ? 5 : 3 * 60 * 60,
});

type PlanOptions = {
  includeProgram?: boolean;
}

export async function getUncachedPlan(id: string, options: PlanOptions = { includeProgram: true }) {
  try {
    await connectDB();

    const plan = (await PlanModel.findById(id)
      // .lean()) as Plan & { program: Program };
      .populate(options.includeProgram ? 'program' : '').lean()) as Plan & { program: Program };

    return plan;
  }
  catch (error) {
    console.log(error);
    return null;
  }
}

export const getPlan = (id: string, options?: PlanOptions) => nextCache(() => getUncachedPlan(id, options), ['plan', id], {
  tags: ['plan', id],
  revalidate: process.env.NODE_ENV === 'development' ? 5 : 3 * 60 * 60,
})();


export async function getRazorpayCustomer(options?: {
  email?: string;
  name?: string;
  phone?: string;
  create?: boolean;
}) {
  try {
    let { email, name, phone, create = true } = options || {};

    if (!email) {
      const { user: u } = await authenticate();
      if (!u) throw new Error("Please login to continue.");

      (email = u.email), (name = u.name), (phone = u.phone);
    }

    const user = await User.findOne({ email });

    if (user && user.razorpayCustomerId) {
      return { id: user.razorpayCustomerId };
    }

    // @ts-ignore - await is fine here
    let customer = (await razorpay.customers.create({
      email,
      name,
      contact: phone,
      // @ts-ignore - 0 is not working as expected
      fail_existing: "0",
    })) as unknown as Customers.RazorpayCustomer;

    logger.log(customer);

    if (!customer || !customer.id) {
      throw new Error("Failed to create Razorpay user.");
    }

    await User.findOneAndUpdate(
      { email: user!.email },
      { razorpayCustomerId: customer.id }
    );

    return customer;
  } catch (error: any) {
    if (error?.statusCode == 400 && error.error.description == 'Customer already exists for the merchant') {

    } else {
      console.log(error);
      throw new Error("Failed to get Razorpay user.");
    }
  }
}

// create subscription, take plan id from the plan collection, get userId from the session
export async function createSubscription({ planId }: { planId: string }) {
  try {
    await connectDB();
    const { user: authUser } = await authenticate();

    if (!authUser) {
      return { error: "Please login to continue." };
    }

    // check if plan exists
    const plan = (await PlanModel.findOne(
      { _id: planId },
      "_id programId"
    ).lean()) as Pick<Plan, "programId">;
    // console.log(plan)

    if (!plan) {
      return { error: "Plan not found." };
    }

    const customer = await getRazorpayCustomer({
      email: authUser.email,
      phone: authUser.phone,
      create: true,
    });

    if (!customer) {
      return { error: "Failed to create customer." };
    }

    // create subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      total_count: 1,
      notes: {
        email: authUser.email,
        phone: authUser.phone,
        programId: plan.programId,
        customer_id: customer.id,
      },
      // expire in 10 minutes
      expire_by: Math.floor(Date.now() / 1000) + 600,
    });

    if (!subscription || !subscription.id) {
      return { error: "Subscription creation failed." };
    }

    return { subscriptionId: subscription.id };
    // const plan = await
  } catch (error) {
    console.log(error);
    return { error: "Failed to create subscription." };
  }
}

// function to verify payment using user, subscription id and payment id
export const verifyPayment = async ({
  subscriptionId,
  paymentId,
}: {
  subscriptionId: string;
  paymentId: string;
}) => {
  try {
    await connectDB();
    const auth = await authenticate();

    if (!auth.user) return { error: "Please login to continue." };

    const [subscription, payment] = await Promise.all([
      razorpay.subscriptions.fetch(subscriptionId),
      razorpay.payments.fetch(paymentId),
    ]);
    logger.log(subscription);

    // check if subscription exists and is active
    if (!subscription || subscription.status == "cancelled")
      return { error: "Subscription not found or inactive." };

    // check if payment exists and is captured
    if (!payment || payment.status !== "captured")
      return { error: "Payment not found or not captured." };

    // match subscription id with payment subscription id, and email with user email
    if (auth.user.email !== payment.email) return { error: "Invalid user email." };

    const meta = subscription.notes as {
      email: string;
      phone: string;
      programId: string;
      customer_id: string;
    };

    logger.log(payment);

    // save subscription details in the database
    await Subscription.findOneAndUpdate(
      { id: subscription.id },
      {
        ...subscription,
        customer_id: meta?.customer_id || payment.customer_id,
        programId: meta?.programId,
      },
      { upsert: true }
    );

    return { subscription, payment };
  } catch (error) {
    console.log(error);
    return { error: "Failed to verify payment." };
  }
};

export const getSubscriptions = async () => {
  try {
    const auth = await authenticate();
    if (!auth || !auth.user) throw new Error("Not authenticated");

    await connectDB();

    const user = (await User.findOne({ email: auth.user.email }).lean()) as any;
    if (!user) {
      return { error: "User not found." };
    }

    const subscriptions = await Subscription.find({
      customer_id: user.razorpayCustomerId,
    })
      .populate("plan")
      .lean();

    return { subscriptions };
  } catch (error: any) {
    console.log(error);
    return { error: "Failed to get subscriptions." };
  }
};