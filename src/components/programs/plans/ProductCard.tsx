"use client";
// import cross from "@/assets/Cross.png";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { getSubscriptions } from "@/lib/stripe";
import { Subscription } from "@/types/db";
import { Plan } from "@/types/subscription";
import clsx from "clsx";
import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";
// import { RxCross2 } from "react-icons/rx";
import Script from "next/script";

// interface Interval {
//   period: "daily" | "weekly" | "monthly" | "yearly";
//   interval: number;
// }

interface ProductCardProps {
  plan: Plan;
  //   billingInterval: Interval;
  subscription?: Subscription;
}

const ProductCard = ({
  //   billingInterval,
  plan,
  subscription,
}: ProductCardProps) => {
  const price = plan.item.amount ? plan.item.amount / 100 : "";
  const isSubscriptionActive = ["active", "created"].includes(
    subscription?.status as any as string
  );

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
