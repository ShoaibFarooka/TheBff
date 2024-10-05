import { createTRPCRouter, protectedProcedure } from "../../trpc";
import * as services from "./subscription.service";

export const subscriptionRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => services.getUserSubscriptions(ctx)),
});
