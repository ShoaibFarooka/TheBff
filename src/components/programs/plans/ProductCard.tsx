"use client";
// import cross from "@/assets/Cross.png";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { getSubscriptions } from "@/lib/stripe";
import { getServerData } from "@/lib/utils";
import { Subscription } from "@/types/db";
import { Plan } from "@/types/subscription";
import clsx from "clsx";
import Link from "next/link";
import { TransitionStartFunction } from "react";
import toast from "react-hot-toast";
import { FaCircleCheck } from "react-icons/fa6";
// import { RxCross2 } from "react-icons/rx";
import { useAuth } from "@/hooks/auth";
import { cookie } from "@/lib/dom";
import { makeSubscriptionPayment } from "@/lib/subscription/client";
import { createSubscription, verifyPayment } from "@/lib/subscription/server";
import { useRouter } from "next/navigation";
import Script from "next/script";

// interface Interval {
//   period: "daily" | "weekly" | "monthly" | "yearly";
//   interval: number;
// }

interface ProductCardProps {
  plan: Plan;
  //   billingInterval: Interval;
  subscription?: Subscription;
  isLoading: boolean;
  startTransition: TransitionStartFunction;
}

const ProductCard = ({
  //   billingInterval,
  plan,
  subscription,
  isLoading,
  startTransition,
}: ProductCardProps) => {
  const { user } = useAuth();
  const router = useRouter();

  const price = plan.item.amount ? plan.item.amount / 100 : "";
  const isSubscriptionActive = ["active", "created"].includes(
    subscription?.status as any as string
  );

  // useDebug('isLoading: ' + isLoading)

  const handleSubscribe = async () => {
    const tid = toast.loading("Processing...");

    try {
      const { error, subscriptionId } = await getServerData<
        ReturnType<typeof createSubscription>
      >(startTransition, async () => {
        // const fromCookie = cookie.get(`subscription-${plan.id}`);
        // if (fromCookie) return { subscriptionId: fromCookie };

        const res = await createSubscription({ planId: plan.id });
        return res;
      });

      if (error || !subscriptionId)
        return toast.error(`Failed to create subscription: \n${error}`, {
          id: tid,
        });

      // save subscription id in cookie for 10 minutes
      // cookie.set(`subscription-${plan.id}`, subscriptionId, 60 * 10);

      toast.loading(
        `Processing payment for subscription ${subscriptionId}...`,
        { id: tid }
      );

      // verifyPayment, returns either error or subscription & payment details
      await makeSubscriptionPayment(subscriptionId, {
        user,
        onSuccess: async (response: any) => {
          const res = await getServerData<ReturnType<typeof verifyPayment>>(
            startTransition,
            async () =>
              verifyPayment({
                paymentId: response.razorpay_payment_id,
                subscriptionId,
              })
          );

          if (res.error) {
            toast.error(`Failed to verify payment: \n${res.error}`, {
              id: tid,
            });
            return;
          }

          toast.success(
            `You have successfully subscribed to ${plan.item.name}. Redirecting to your dashboard...`,
            { id: tid }
          );

          // delete cookie
          cookie.delete(`subscription-${plan.id}`);

          // sleep for 2 seconds
          await new Promise((resolve) => setTimeout(resolve, 2000));
          router.push("/dashboard");
        },

        onError: async (response: any) => {
          toast.error(
            `Payment failed: \n${response.error}. \nPlease try again or contact us for support.`,
            { id: tid }
          );
        },
      });
    } catch (err: any) {
      console.log(err);
      toast.error(err.message ?? "Something went wrong.", { id: tid });
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div
        className={clsx(
          "px-3 md:px-10 rounded-2xl md:mx-5 mb-5 md:mb-0 col-span-1 text-zinc-800 shadow-xl",
          // if product name includes premium, bg-[#FFCC61]
          plan.item.name.toLowerCase().includes("premium") ?
            "bg-[#FFCC61] text-zinc-800 space-y-4 py-10" :
            "py-5 bg-[#E7E7FF]"
        )}
      >
        <h2 className="font-[600] text-2xl text-center">
          {plan.item.name}
        </h2>

        <h3 className="text-center text-[24px] font-semibold text-zinc-700">
          {price && <>₹{price?.toLocaleString("en-IN")} </>}
          {!price && (
            <Link href="/contact-us" className="text-blue-500">
              Contact Us
            </Link>
          )}
        </h3>

        <hr
          className={clsx(
            "border border-zinc-500"
            // product.metadata?.featured ? "my-8" : "my-5"
          )}
        />

        <div className="mt-2">
          {plan.features?.map((feature, i) => (
            <p
              className="space-x-2 mb-2 flex text-zinc-700"
              key={`product-${plan.programId}-feature-${i}`}
            >
              <FaCircleCheck size={20} className="mt-1 text-green-400" />
              <span className="">{feature}</span>
            </p>
          ))}

          <div className="flex items-center justify-center mt-3">
            {!price && !isSubscriptionActive && (
              <Link href="/contact-us" target="_blank">
                <button className="px-5 py-2 rounded-lg  text-white bg-[#6557FF]">
                  Contact Us
                </button>
              </Link>
            )}
            {price &&
              (!isSubscriptionActive ? (
                <Link href={`/checkout?plan=${plan.id}`}>
                  <button
                    className="px-5 py-2 rounded-lg text-white bg-[#6557FF] center gap-2 disabled:opacity-75 hover:opacity-90"
                    // disabled={isLoading}
                    // onClick={handleSubscribe}
                  >
                    Subscribe
                    {/* {isLoading && <Spinner size={15} />} */}
                  </button>
                </Link>
              ) : (
                // <Link href="/subscription">
                <button
                  className="px-5 py-2 rounded-lg  text-white bg-[#6557FF]/70 opacity-75"
                  disabled
                >
                  Already Subscribed
                </button>
                // </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
