"use server";
import { Plan as PlanModel, Subscription, User } from "@/models";
import { authenticate } from "../auth";
import connectDB from "../dbConnection";
// import type { Plan as PlanType } from '@/types/subscription';
import { Plan } from "@/types/subscription";
import { devLog } from "../helpers";
import { razorpay } from "./";

export async function getPlans({ program }: { program?: string } = {}) {
  try {
    await connectDB();

    const plans = await PlanModel.find(program ? { program } : {}).lean();

    // console.log(plans)

    return plans;
  } catch (error) {
    console.log(error);
    return null;
  }
}

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

    let customer = await razorpay.customers.create({
      email,
      name,
      contact: phone,
      fail_existing: 0,
    });

    // console.log(customer);
    
    if (!customer || !customer.id) {
      throw new Error("Failed to create Razorpay user.");
    }

    await User.findOneAndUpdate(
      { email: user.email },
      { razorpayCustomerId: customer.id }
    );

    return customer;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get Razorpay user.");
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
      { id: planId },
      "_id id program"
    ).lean()) as Pick<Plan, "id" | "program">;

    if (!plan) {
      return { error: "Plan not found." };
    }

    // create subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      total_count: 1,

      // expire in 10 minutes
      expire_by: Math.floor(Date.now() / 1000) + 600,
    });

    if (!subscription || !subscription.id) {
      return { error: "Subscription creation failed." };
    }

    const customer = await getRazorpayCustomer({
      email: authUser.email,
      phone: authUser.phone,
      create: true,
    });

    if (!customer) {
      return { error: "Failed to create customer." };
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
    const { user } = await authenticate();

    if (!user) return { error: "Please login to continue." };

    const [subscription, payment] = await Promise.all([
      await razorpay.subscriptions.fetch(subscriptionId),
      await razorpay.payments.fetch(paymentId),
    ]);
    devLog(subscription);

    // check if subscription exists and is active
    if (!subscription || subscription.status == "cancelled")
      return { error: "Subscription not found or inactive." };

    devLog(payment);

    // check if payment exists and is captured
    if (!payment || payment.status !== "captured")
      return { error: "Payment not found or not captured." };

    // match subscription id with payment subscription id, and email with user email
    if (user.email !== payment.email) return { error: "Invalid user email." };

    const plan = (await PlanModel.findOne(
      { id: subscription.plan_id },
      "-_id program"
    ).lean()) as Plan;

    // save customer id in the database
    await User.findOneAndUpdate(
      { email: user.email },
      { razorpayCustomerId: payment.customer_id }
    );

    // save subscription details in the database
    await Subscription.findOneAndUpdate(
      { id: subscription.id },
      {
        ...subscription,
        customer_id: payment.customer_id,
        programId: plan.program,
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
