import { z } from "zod";

export const getCouponSchema = z.string().min(1);

export type GetCouponInput = z.infer<typeof getCouponSchema>;