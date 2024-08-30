"use client";
// import cross from "@/assets/Cross.png";
import Spinner from "@/components/ui/Spinner";
import { getSubscriptions } from "@/lib/subscription/server";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Program } from "@/types/program";
import { Plan } from "@/types/subscription";
import clsx from "clsx";
import { useEffect, useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useProgram } from "../state";
import ProductCard from "./ProductCard";

const periodMap = {
  daily: "day",
  weekly: "week",
  monthly: "month",
  yearly: "year",
};

interface Interval {
  period: "daily" | "weekly" | "monthly" | "yearly";
  interval: number;
}

interface Props {
  overlayVisible: boolean;
  setOverlayVisible: (visible: boolean) => void;
  plans: Plan[];
  program: Program;
}

export default function ChoosePlan({
  plans,
  overlayVisible,
  setOverlayVisible,
  program,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, startSubscriptionTransition] = useTransition();

  const [billingInterval, setBillingInterval] = useState<Interval>({
    period: "monthly",
    interval: 1,
  });

  // dynamically get billing interval based on product
  const billingIntervals = useMemo(() => {
    let intervals = [] as Interval[];
    // let intervals = new Map<string, Interval>();
    if (!plans) return intervals;

    // get all intervals and period from plans and store it once in the state
    plans.forEach((plan) => {
      const { interval, period } = plan;

      const exists = intervals.find(
        (x) => x.interval === interval && x.period === period
      );

      if (!exists) {
        intervals.push({
          interval,
          period: period as any,
        });
      }
    });

    setBillingInterval(intervals[0]);
    return intervals;
  }, [plans]);

  const onClose = () => {
    setOverlayVisible(false);

    // make sure scroll is enabled
    document.body.style.overflow = "auto";
  };

  const subscription = useProgram(
    (state) => state.subscriptions[plans?.[0]?.programId]
  );
  const setSubscription = useProgram((state) => state.setSubscription);

  useEffect(() => {
    if (subscription !== undefined) return;

    startTransition(() => {
      getSubscriptions()
        .then((res) => {
          if (res.error) return toast.error(res.error);

          for (const sub of res.subscriptions!) {
            setSubscription(sub.plan.programId, sub as any);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plans, subscription]);

  if (!plans || !plans.length)
    return (
      <div>
        <h1>No plans found</h1>
      </div>
    );

  if (isPending)
    return (
      <div className="fixed top-0 left-0 w-screen center h-screen bg-black bg-opacity-30 backdrop-blur-md z-30">
        {/* show loader */}
        <Spinner size={45} />
      </div>
    );

  if (!overlayVisible) return null;

  return (
    // <Dialog open={overlayVisible} onOpenChange={onClose}>
    <div className="fixed inset-0 bg-black/20 backdrop-blur w-screen h-screen flex items-center justify-center z-40">
      <div
        className="!min-w-min fixed border-none !overflow-auto !min-h-min"
      // onInteractOutside={e => e.preventDefault()}
      >
        <div className="!min-w-[90vw] !min-h-min px-5 md:px-10 overflow-auto py-3 bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-[24px]">
          <div className="w-full mb-4">
            <div className="relative flex justify-center items-center">
              <button
                onClick={onClose}
                className="absolute top-0 left-0 md:top-2 md:left-2 bg-white rounded-2xl p-1 group hover:bg-red-500"
              >
                <RxCross2
                  size={20}
                  className="fill-red-500 text-red-500 group-hover:text-white"
                />
              </button>

              <h2 className="text-2xl md:text-5xl font-bold text-[#F2BD4D] text-center mb-4 ">
                Choose Plan for {program.name}
              </h2>
            </div>

            <p className="text-white text-center text-xs md:text-base">
              Select a plan which suits you best and start your journey with us!
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div className="inline bg-white px-1 py-1 rounded-md space-x-1">
              {billingIntervals?.map((interval) => (
                <button
                  key={`interval-${interval.period}-${interval.interval}`}
                  className={clsx(
                    "px-4 py-2 hover:bg-blue-300 hover:text-white rounded-md focus:text-white",
                    {
                      "bg-[#6557FF] text-white":
                        billingInterval.period === interval.period &&
                        billingInterval.interval === interval.interval,
                    }
                  )}
                  onClick={() => setBillingInterval(interval)}
                >
                  {interval.interval === 1 &&
                    capitalizeFirstLetter(`${interval.period}`)}
                  {interval.interval > 1 && (
                    <>
                      {interval.interval}{" "}
                      {capitalizeFirstLetter(periodMap[interval.period])}
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 justify-center md:items-center py-6 px-5 max-w-5xl mx-auto">
            {plans &&
              plans.length > 0 &&
              plans
                .filter(
                  (x) =>
                    x.period === billingInterval.period &&
                    x.interval === billingInterval.interval
                )
                .map((plan, index) => (
                  <ProductCard
                    plan={plan}
                    // billingInterval={billingInterval}
                    key={`product-${index}`}
                    subscription={subscription}
                  />
                ))}

            {/* 
                    Custom / Enterprise plan
                  */}
            <ProductCard
              plan={
                {
                  item: {
                    name: "Enterprise",
                  },
                  id: "enterprise",
                  features: [
                    "All features in Premium Plan",
                    "Bulk Discount",
                    "24*7 Support",
                  ],
                } as any
              }
            />
          </div>
        </div>
      </div>
    </div>
    // </Dialog>
  );
}
