import { z } from "zod";

export const sendContactRequestParams = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string().min(1),
});

export type SendContactRequestInput = z.infer<typeof sendContactRequestParams>;