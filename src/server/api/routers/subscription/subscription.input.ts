import { z } from "zod";

export const getUserSubscriptionsParams = z.object({
  programId: z.string().min(1),
});