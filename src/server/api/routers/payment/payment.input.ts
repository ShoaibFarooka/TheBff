import { z } from "zod";

export const createOrderParams = z.object({
  couponCode: z.string().optional().nullish(),
}).optional();

export type CreateOrderInput = z.infer<typeof createOrderParams>;

export const verifyPaymentParams = z.object({
  paymentId: z.string().min(1),
  orderId: z.string().min(1),
  signature: z.string().min(1),
});

export type VerifyPaymentInput = z.infer<typeof verifyPaymentParams>;