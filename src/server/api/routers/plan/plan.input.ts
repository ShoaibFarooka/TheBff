import { z } from "zod";

export const getPlansParams = z.object({
    programId: z.string().min(1),
})

export type GetPlansInput = z.infer<typeof getPlansParams>