import { calculateDiscount } from "@/lib";
import { authenticate } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { razorpay, RAZORPAY_KEY_SECRET } from "@/lib/subscription";
import { Cart, Coupon, Order, Plan, Subscription, User } from "@/models";
import { SubscriptionStatus } from "@/types/subscription";
import { Customers } from "razorpay/dist/types/customers";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import type { ProtectedTRPCContext } from "../../trpc";
import { CreateOrderInput, VerifyPaymentInput } from "./payment.input";

// get the cart of the user, if the user does not have a cart, throw an error
// calculate the total amount of the cart and create a new razorpay order
export const createOrder = async (ctx: ProtectedTRPCContext, input: CreateOrderInput) => {
  try {
    const [cart, coupon] = await Promise.all([
      Cart.findOne({ user: ctx.user!._id }),

      input?.couponCode ?
        Coupon.findOne({ code: input.couponCode })
        : Promise.resolve(null)
    ])

    if (!cart) throw new Error("Cart not found");
    if (!cart.items || cart.items.length === 0) {
      return { error: "Cart is empty" };
    }
    if (input?.couponCode && !coupon) {
      return { error: "Coupon not found" };
    }


    const cartAmount = cart.items.reduce((acc, item) => acc + item.price, 0);
    const discount = calculateDiscount(cartAmount, {
      type: coupon?.type!,
      discount: coupon?.discount!
    }) ?? 0;
    const finalAmount = cartAmount - discount;

    const customer = await getRazorpayCustomer({
      email: ctx.user!.email,
      phone: ctx.user!.phone,
    });

    if (!customer) {
      return { error: "Failed to create customer." };
    }

    const order = await razorpay.orders.create({
      // amount is already in paisa
      amount: finalAmount,
      currency: "INR",
      receipt: cart.user as string,
      payment_capture: 1 as unknown as boolean,
      partial_payment: false,
      notes: {
        plans: cart.items.map((item) => item.plan).join(","),
        userId: cart.user as string,
        customerId: customer.id,
      },
      customer_id: customer.id,
    });

    if (!order?.id) {
      return { error: "Failed to create order" };
    }

    // create subscriptions for the user in database
    const plans = await Plan.find({ _id: { $in: cart.items.map((item) => item.plan) } });

    const promises: Promise<any>[] = plans.map((plan) => {
      return Subscription.create({
        userId: cart.user,
        planId: plan._id,
        orderId: order.id,
        programId: plan.programId,
        status: SubscriptionStatus.pending,
        startDate: new Date(),
        endDate: caclulateEndDate({
          period: plan.period,
          interval: plan.interval,
        }),
      })
    });

    promises.push(
      Order.create(order)
    )

    await Promise.all(promises);

    return {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    };
  } catch (err: any) {
    console.error(err);
    return { error: err?.message ?? "Failed to create order" }
  }
};

export const verifyPayment = async (ctx: ProtectedTRPCContext, input: VerifyPaymentInput) => {
  try {
    const { paymentId, orderId, signature } = input;

    const order = await razorpay.orders.fetch(orderId);

    if (!order) {
      return { error: "Order not found" };
    }

    const isValid = validatePaymentVerification({
      order_id: order.id,
      payment_id: paymentId,
    }, signature, RAZORPAY_KEY_SECRET);

    if (!isValid) {
      return { error: "Failed to verify payment. Recieved invalid signature" };
    }

    // create subscription for the user in database
    const planIds = (order.notes!?.plans as string)!?.split(",");

    const subscriptionPromise = Subscription.updateMany({
      userId: ctx.user!._id,
      planId: { $in: planIds },
      status: SubscriptionStatus.pending
    }, {
      status: SubscriptionStatus.active
    })

    // empty cart
    const cartPromise = Cart.updateOne({ user: ctx.user!._id }, { items: [] });

    // send notification email to admin
    await Promise.all([
      cartPromise,
      subscriptionPromise
    ])

    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { error: err?.message ?? "Failed to verify payment" };
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

    const user = await User.findOne({ email }, 'razorpayCustomerId');

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

function caclulateEndDate({
  startDate = new Date(),
  period,
  interval
}: {
  startDate?: Date;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
}) {
  const endDate = new Date(startDate);

  // till 11:59:59 PM
  endDate.setHours(23, 59, 59, 999);

  switch (period) {
    case "daily":
      endDate.setDate(endDate.getDate() + interval);
      break;
    case "weekly":
      endDate.setDate(endDate.getDate() + interval * 7);
      break;
    case "monthly":
      endDate.setMonth(endDate.getMonth() + interval);
      break;
    case "yearly":
      endDate.setFullYear(endDate.getFullYear() + interval);
      break;
  }

  logger.info("End Date: ", endDate.toLocaleDateString());

  return endDate;
}
