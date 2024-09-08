import { cartRouter } from "./routers/cart/cart.procedure";
import { couponRouter } from "./routers/coupon/coupon.procedure";
import { paymentRouter } from "./routers/payment/payment.procedure";
import { planRouter } from "./routers/plan/plan.procedure";
import { subscriptionRouter } from "./routers/subscription/subscription.procedure";
import { userRouter } from "./routers/user/user.procedure";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  cart: cartRouter,
  payment: paymentRouter,
  subscriptions: subscriptionRouter,
  user: userRouter,
  coupon: couponRouter,
  plan: planRouter,
});

export type AppRouter = typeof appRouter;
