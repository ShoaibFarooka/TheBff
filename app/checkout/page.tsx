import Checkout from "@/components/checkout";
import { authenticate } from "@/lib/auth";
import { getUserDataWithSubscription } from "@/lib/dbHelpers";
import { logger } from "@/lib/logger";
import { getPlan } from "@/lib/subscription/server";
import { getOffers, getSuggestedPlans } from "@/lib/subscription/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: {
    plan: string;
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
    const matchedSubscription = subscription?.subscriptions?.find(x => x.plan_id === planId);

    if (
      matchedSubscription &&
      (
        matchedSubscription.status !== "active" ||
        matchedSubscription.current_end > new Date() // check if current_end is greater than current time
      )
    )
      throw new Error(`Great news! You already have a subscription to this plan.`)

    const plan = await getPlan(planId);
    if (!plan || !plan.item)
      throw new Error("Plan not found");

    // const offers = await getOffers();
    const [offers, suggestedPlans] = await Promise.all([
      getOffers(),
      getSuggestedPlans() as unknown as { title: string, planId: string }[]
    ]);

    return {
      plan,
      offers,
      suggestedPlans
    };
  } catch (error: any) {
    logger.log(error);
    return { error: error.message ?? "Failed to get data" };
  }
}


async function CheckoutPage({ searchParams: { plan: planId } }: PageProps) {

  const auth = await authenticate();
  if (!auth.success || auth.unAuthenticated)
    return redirect("/login?cb=/dashboard");

  if (!planId || !planId.startsWith('plan_'))
    return <ErrorMessage message="Invalid plan id " />

  // const pageData = (await getPageData("checkout")) as any;
  const data = await getData({
    planId,
    email: auth.user.email
  });

  if (data.error)
    return <ErrorMessage message={data.error} />
  // console.dir({ plan });
  // console.dir({ image: plan.program.image })

  return <Checkout plan={data.plan!} offers={data.offers!} suggestedPlans={data.suggestedPlans! as any} />;
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
