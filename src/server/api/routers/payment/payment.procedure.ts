import { createTRPCRouter, protectedProcedure } from "../../trpc";
import * as inputs from "./payment.input";
import * as services from "./payment.service";

export const paymentRouter = createTRPCRouter({
    createOrder: protectedProcedure.input(inputs.createOrderParams).mutation(({ ctx, input }) => services.createOrder(ctx, input)),
    verifyPayment: protectedProcedure.input(inputs.verifyPaymentParams).mutation(({ ctx, input }) => services.verifyPayment(ctx, input)),
});
