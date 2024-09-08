import { login, register } from "@/lib/auth";
import { TRPCContext } from "../../trpc";
import { LoginInput, RegisterInput } from "./user.input";

export const userLogin = async (ctx: TRPCContext, input: LoginInput) => {
    return login(input);
}

export const userRegister = async (ctx: TRPCContext, input: RegisterInput) => {
    return register(input);
}