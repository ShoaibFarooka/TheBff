import PlanDetails from "@/components/plandetails";
import { authenticate } from "@/lib/auth";
import { getUserDataWithSubscription } from "@/lib/dbHelpers";
import { logger } from "@/lib/logger";
import { getPlan } from "@/lib/subscription/server";
import { getSuggestedPlans } from "@/lib/subscription/utils";
import { Metadata } from "next";

type PageProps = {
  params: {
    id: string;
    [key: string]: string;
  }
}

export const metadata: Metadata = {
  title: "Checkout | The BFF",
  description: "Checkout page",
}

type GetDataParams = {
  planId: string;
  email: string;
}

const getData = async ({ planId, email }: GetDataParams) => {
  try {
    // check if user already has a subscription to this plan

    const subscription = await getUserDataWithSubscription(email);
    const matchedSubscription = subscription?.subscriptions?.find(x => x.planId === planId);

    if (
      matchedSubscription &&
      (
        matchedSubscription.status !== "active" ||
        matchedSubscription.endDate > new Date() // check if current_end is greater than current time
      )
    )
      throw new Error(`Great news! You already have a subscription to this plan.`)

    const plan = await getPlan(planId);
    if (!plan)
      throw new Error("Plan not found");

    const suggestedPlans = await getSuggestedPlans() as unknown as { plans: { title: string, planId: string }[] }

    return {
      plan,
      suggestedPlans
    };
  } catch (error: any) {
    logger.log(error);
    return { error: error.message ?? "Failed to get data" };
  }
}

async function CheckoutPage({ params: { id: planId } }: PageProps) {

  const auth = await authenticate();

  // || !planId.startsWith('plan_')
  if (!planId)
    return <ErrorMessage message="Invalid plan id " />

  // const pageData = (await getPageData("checkout")) as any;
  const data = await getData({
    planId,
    email: auth.user!.email
  });

  const parsedData: typeof data = JSON.parse(JSON.stringify(data));

  if (data.error)
    return <ErrorMessage message={data.error} />

  return <PlanDetails plan={parsedData.plan!} suggestedPlans={(parsedData.suggestedPlans?.plans ?? []) as any} />;
}


function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="py-40 text-center container min-h-96 center">
      <div className="rounded-3xl bg-gradient-to-r from-[#4A2F70] to-[#344363] px-[25px] py-5 lg:px-[55px] xl:py-10">
        <h2 className="text-3xl text-zinc-200 font-semibold">
          {message}
        </h2>
      </div>
    </div>
  )
}

export default CheckoutPage
