"use client";
import Spinner from "@/components/ui/Spinner";
import { useDisableBodyScroll } from "@/lib/hooks";
import { capitalizeFirstLetter } from "@/lib/utils";
import clsx from "clsx";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

interface Interval {
  period: "monthly";
  interval: 1 | 3 | 6;
}

interface Plan {
  _id: string;
  name: string;
  category: 'standard' | 'premium' | 'enterprise';
  amount: number;
  currency: string;
  period: string;
  interval: number;
  description: string;
  image: string;
  programId: string;
  features: string[];
}

interface Props {
  _id: string;
  planId: string;
  visible: boolean;
  onClose: () => void;
}

// Update the periodMap constant to include type information
const periodMap: Record<string, string> = {
  daily: "day",
  weekly: "week",
  monthly: "month",
  yearly: "year",
};

export default function ChoosePlanLoggedOut({ _id, planId, visible, onClose }: Props) {
  const [billingInterval, setBillingInterval] = useState<Interval>({
    period: "monthly",
    interval: 1,
  });
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useDisableBodyScroll();
  const router = useRouter();
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/plans/plans-by-programId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ programId: planId }),
        });

        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.message);
        }

        if (!result.data.length) {
          toast.error("Plan details not found");
          onClose();
          return;
        }

        setPlans(result.data);
      } catch (error: any) {
        toast.error(error.message || "Failed to load plans");
        onClose();
      } finally {
        setIsLoading(false);
      }
    };

    if (visible) {
      fetchPlans();
    }
  }, [planId, visible, onClose]);

  // Get available billing intervals from plans
  const billingIntervals = useMemo(() => {
    let intervals = [] as Interval[];
    if (!plans.length) return intervals;

    plans.forEach((plan) => {
      const { interval, period } = plan;

      const exists = intervals.find(
        (x) => x.interval === interval && x.period === period
      );

      if (!exists) {
        intervals.push({
          interval: interval as 1 | 3 | 6,
          period: period as "monthly",
        });
      }
    });

    return intervals;
  }, [plans]);

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-screen center h-screen bg-black bg-opacity-30 backdrop-blur-md z-30">
        <Spinner size={45} />
      </div>
    );
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur w-screen h-screen flex items-center justify-center z-40">
      <div className="!min-w-min fixed border-none gradient-bg rounded-3xl">
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
                Choose Your Plan
              </h2>
            </div>

            <p className="text-white text-center text-xs md:text-base">
              Select a plan which suits you best and start your journey with us!
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div className="inline bg-white px-1 py-1 rounded-md space-x-1">
              {billingIntervals.map((interval) => (
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
            {plans
              .filter(
                (x) =>
                  x.period === billingInterval.period &&
                  x.interval === billingInterval.interval
              )
              .map((plan, index) => (
                <div
                  key={`product-${index}`}
                  className={clsx(
                    "rounded-xl p-6 w-full md:w-1/3 hover:scale-105 transition-transform duration-300",
                    {
                      "bg-white": plan.category === "standard" || plan.category === "enterprise",
                      "bg-[#F2BD4D]": plan.category === "premium",
                      "relative": plan.category === "premium"
                    }
                  )}
                >
                  {plan.category === "premium" && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-black text-white px-4 py-1 rounded-full text-sm">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className={clsx("text-2xl font-bold mb-2", {
                      "text-black": plan.category === "standard" || plan.category === "premium"
                    })}>
                      {capitalizeFirstLetter(plan.category)}
                    </h3>
                    <div className={clsx("text-4xl font-bold mb-2", {
                      "text-black": plan.category === "standard" || plan.category === "premium"
                    })}>
                      ₹{(plan.amount / 100).toLocaleString()}
                    </div>
                    <p className="text-gray-600 mb-4">
                      for {plan.interval}{" "}
                      {plan.interval === 1
                        ? capitalizeFirstLetter(periodMap[plan.period])
                        : `${capitalizeFirstLetter(periodMap[plan.period])}s`}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <ul className="space-y-2 text-black">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      className={clsx(
                        "w-full py-2 px-4 text-white rounded-lg transition-colors bg-[#6557FF] hover:bg-[#6557FF]/90",
                        // {
                        //   "bg-[#6557FF] hover:bg-[#6557FF]/90": plan.category === "standard",
                        //   "bg-[#6557FF] hover:bg-[#6557FF]/90": plan.category === "premium",
                        //   "bg-gray-800 hover:bg-gray-700": plan.category === "enterprise"
                        // }
                      )}
                      onClick={() => {
                        const planPath = `/plan/${_id}`;
                        if (token) {
                          // User is logged in - direct to checkout
                          router.push(planPath);
                        } else {
                          // User is not logged in - redirect to login with callback
                          router.push(`/login?callbackUrl=${encodeURIComponent(planPath)}`);
                        }
                      }}
                    >
                      {plan.category === "enterprise" ? "Contact Sales" : "Get Started"}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
