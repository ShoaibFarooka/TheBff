import { z } from "zod";

export const addItemSchema = z.object({
  planId: z.string(),
})

export type AddItemInput = z.infer<typeof addItemSchema>;

export const removeItemSchema = addItemSchema.pick({
  planId: true,
})

export type RemoveItemInput = z.infer<typeof removeItemSchema>;