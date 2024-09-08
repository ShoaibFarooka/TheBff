import { createTRPCRouter, protectedProcedure } from "../../trpc";
import * as inputs from "./cart.input";
import * as services from "./cart.service";

export const cartRouter = createTRPCRouter({
    get: protectedProcedure.query(({ ctx }) => services.getCart(ctx)),
    addItem: protectedProcedure.input(inputs.addItemSchema).mutation(({ ctx, input }) => services.addItem(ctx, input)),
    removeItem: protectedProcedure.input(inputs.removeItemSchema).mutation(({ ctx, input }) => services.removeItem(ctx, input)),
    empty: protectedProcedure.mutation(({ ctx }) => services.emptyCart(ctx)),
});
