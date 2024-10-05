import { logger } from "@/lib/logger";
import { Subscription } from "@/models";
import { Subscription as SubscriptionType } from "@/types/subscription";
import { ProtectedTRPCContext } from "../../trpc";

export const getUserSubscriptions = async (ctx: ProtectedTRPCContext) => {
  try {
    // Find the user's subscriptions
    const subscriptions = await Subscription.find({ userId: ctx.user?._id })
      .lean<SubscriptionType[]>()
    
      // subscriptions.forEach((subscription) => {
      //   // subscription
      // })

      // logger.log('subscriptions:', subscriptions);
      

    return subscriptions;
  } catch (err) {
    logger.error(err);
    return null;
  }
}