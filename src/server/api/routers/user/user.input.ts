import { z } from "zod";

export const loginParams = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export type LoginInput = z.infer<typeof loginParams>;

export const registerParams = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(10).max(10),
    password: z.string().min(6),
    address: z.object({
        house: z.string().min(1),
        area: z.string().min(1),
        pincode: z.string().min(1),
        city: z.string().min(1),
        state: z.string().min(1),
    })
})

export type RegisterInput = z.infer<typeof registerParams>;