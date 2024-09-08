import { createTRPCRouter, protectedProcedure } from "../../trpc";
import * as input from "./plan.input";
import * as services from "./plan.services";

export const planRouter = createTRPCRouter({
  get: protectedProcedure.input(input.getPlansParams).query(({ ctx, input }) => services.getPlans(ctx, input)),
});