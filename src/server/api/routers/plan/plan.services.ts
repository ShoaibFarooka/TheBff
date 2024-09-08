import { Plan } from "@/models";
import { ProtectedTRPCContext } from "../../trpc";
import { GetPlansInput } from "./plan.input";

export const getPlans = async (ctx: ProtectedTRPCContext, input: GetPlansInput) => {
    try {
        // Fetch plans from the database
        const plans = await Plan.find({ programId: input.programId });

        // Return the plans
        return plans
    } catch (err) {
        console.error(err);
        return [];
    }
}