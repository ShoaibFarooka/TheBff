import { Plan as PlanModel } from '@/models';
import connectDB from "../dbConnection";
// import type { Plan as PlanType } from '@/types/subscription';

export const getPlans = async (
    { program }: { program?: string } = {}
) => {
    try {
        await connectDB()

        const plans = await PlanModel.find(
            program ? { program } : {}
        ).lean()

        // console.log(plans)

        return plans

    } catch (error) {
        console.log(error)
        return null
    }
}