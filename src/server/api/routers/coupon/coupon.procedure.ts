import { createTRPCRouter, protectedProcedure } from "../../trpc";
import * as inputs from "./coupon.input";
import * as services from "./coupon.service";

export const couponRouter = createTRPCRouter({
    get: protectedProcedure.input(inputs.getCouponSchema).query(({ ctx, input }) => services.getCoupon(ctx, input)),
});
