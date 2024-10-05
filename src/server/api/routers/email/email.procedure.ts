import { createTRPCRouter, protectedProcedure } from "../../trpc";
import * as inputs from "./email.input";
import * as services from "./email.service";

export const emailRouter = createTRPCRouter({
    sendContactRequest: protectedProcedure.input(inputs.sendContactRequestParams).mutation(({ ctx, input }) => services.sendContactRequest(ctx, input)),
});
