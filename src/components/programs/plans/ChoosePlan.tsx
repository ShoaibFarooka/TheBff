"use client";
// import cross from "@/assets/Cross.png";
import Spinner from "@/components/ui/Spinner";
import { useDisableBodyScroll } from "@/lib/hooks";
import { capitalizeFirstLetter } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Feature, Program } from "@/types/program";
import { Plan } from "@/types/subscription";
import clsx from "clsx";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
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
  feature: Feature;
}

export default function ChoosePlan({
  // plans,
  overlayVisible,
  setOverlayVisible,
  program,
  feature,
}: Props) {
  const [billingInterval, setBillingInterval] = useState<Interval>({
    period: "monthly",
    interval: 1,
  });
  useDisableBodyScroll();

  const onClose = () => {
    setOverlayVisible(false);

    // make sure scroll is enabled
    document.body.style.overflow = "auto";
  };

  const { data: plans, isLoading: isPlanLoading } = api.plan.get.useQuery({
    programId: `${program.id}.${feature?.id}`
  }, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    onSettled(data) {
      if (!data) {
        toast.error("No plans found for the selected program");
        onClose()
      }

    }
  })

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


  // fetching all subscriptions at once to avoid multiple requests as one might not have too many subscriptions
  const {
    data: subscriptions,
    isLoading: isPending
  } = api.subscriptions.get.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const subscription = useMemo(() => {
    if (!subscriptions) return;

    const sub = subscriptions.find((x) => x.programId === `${program.id}.${feature?.id}`);
    return sub;
  }, [subscriptions, program.id, feature?.id]);

  if (!isPlanLoading && (!plans || !plans.length)) {
    onClose();
    toast.error("No plans found for the selected program");
    return <></>
  }

  if (isPending || isPlanLoading)
    return (
      <div className="fixed top-0 left-0 w-screen center h-screen bg-black bg-opacity-30 backdrop-blur-md z-30">
        <Spinner size={45} />
      </div>
    );

  if (!overlayVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur w-screen h-screen flex items-center justify-center z-40">
      <div
        className="!min-w-min fixed border-none gradient-bg rounded-3xl"
      >
        <div className="!min-w-[90vw] px-5 md:px-10 py-3 max-h-[90vh] overflow-y-auto custom-scroll-bar">
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

              <h2 className="text-2xl md:text-5xl font-bold text-[#F2BD4D] text-center mb-1 md:mb-4 mt-10 md:mt-0">
                Choose Plan for {feature.title}
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
                    "px-4 py-2 text-primary hover:bg-blue-300 hover:text-white rounded-md focus:text-white",
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

          <div className="flex flex-col md:flex-row justify-center gap-10 md:items-center py-6 px-5 max-w-5xl mx-auto">
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
                    key={`product-${index}`}
                    subscription={subscription}
                  />
                ))}

            {/* Custom / Enterprise plan */}
            {/* <ProductCard
              plan={
                {
                  name: "Enterprise",
                  // id: "enterprise",
                  features: [
                    "All features in Premium Plan",
                    "Bulk Discount",
                    "24*7 Support",
                  ],
                } as Plan
              }
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
