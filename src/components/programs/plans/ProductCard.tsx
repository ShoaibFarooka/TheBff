"use client";
import { Plan, Subscription } from "@/types/subscription";
import clsx from "clsx";
import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";

interface ProductCardProps {
  plan: Plan;
  subscription?: Subscription | undefined | null;
}

const ProductCard = ({
  plan,
  subscription,
}: ProductCardProps) => {
  const price = plan.amount ? plan.amount / 100 : "";
  const isSubscriptionActive = ["active"].includes(
    subscription?.status as any as string
  );

  return (
    <>
      <div
        className={clsx(
          "px-3 md:px-10 rounded-2xl text-zinc-800 shadow-xl w-full md:w-1/3 h-full flex flex-col",
          // if product name includes premium, bg-[#FFCC61]
          plan.premium || plan.category?.toLocaleLowerCase() == 'premium' ?
            "bg-[#FFCC61] text-zinc-800 space-y-4 py-10" :
            "py-5 bg-[#E7E7FF]"
        )}
      >
        <div className="">
          <h2 className="font-[600] text-2xl text-center capitalize">
            {plan.category}
          </h2>

          <h3 className="text-center text-[24px] font-semibold text-zinc-700">
            {price && <>₹{price?.toLocaleString("en-IN")} </>}
            {!price && (
              <Link href="/contact-us" className="text-blue-500 p-0 m-0">
                Contact Us
              </Link>
            )}
          </h3>
        </div>


        <hr
          className={clsx(
            "border border-zinc-500"
            // product.metadata?.featured ? "my-8" : "my-5"
          )}
        />

        <div className="mt-2 grow">
          {plan.features?.map((feature, i) => (
            <p
              className="space-x-2 mb-2 flex text-zinc-700"
              key={`product-${plan.programId}-feature-${i}`}
            >
              <FaCircleCheck size={20} className="mt-1 text-green-400" />
              <span className="">{feature}</span>
            </p>
          ))}

        </div>

        <div className="">
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
                <Link href={`/plan/${plan._id}`} prefetch={false}>
                  <button
                    className="px-5 py-2 rounded-lg text-white bg-[#6557FF] center gap-2 disabled:opacity-75 hover:opacity-90"
                  >
                    See Details
                  </button>
                </Link>
              ) : (
                <button
                  className="px-5 py-2 rounded-lg  text-white bg-[#6557FF]/70 opacity-75"
                  disabled
                >
                  Already Subscribed
                </button>
              ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default ProductCard;
