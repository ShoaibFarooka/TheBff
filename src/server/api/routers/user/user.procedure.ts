import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc";
import * as input from "./user.input";
import * as services from "./user.services";

export const userRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => ctx.user),
  login: publicProcedure.input(input.loginParams).mutation(({ ctx, input }) => services.userLogin(ctx, input)),
  register: publicProcedure.input(input.registerParams).mutation(({ ctx, input }) => services.userRegister(ctx, input)),
});