"use client";
// import cross from "@/assets/Cross.png";
import { useDebug } from "@/lib/hooks";
import { getSubscriptions } from "@/lib/stripe";
import { getStripe } from "@/lib/stripeClient";
import { capitalizeFirstLetter, getServerData } from "@/lib/utils";
import { Subscription } from "@/types/db";
import { Program } from "@/types/program";
import { Plan } from "@/types/subscription";
import clsx from "clsx";
import Link from "next/link";
import {
  TransitionStartFunction,
  useEffect,
  useMemo,
  useState,
  useTransition
} from "react";
import toast from "react-hot-toast";
import { FaCircleCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Spinner from "../ui/Spinner";
import { Dialog, DialogContent } from "../ui/dialog";
import { useProgram } from "./state";

const periodMap = {
  'daily': 'day',
  'weekly': 'week',
  'monthly': 'month',
  'yearly': 'year',
}

type PeriodType = keyof typeof periodMap

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

interface ProductCardProps {
  plan: Plan;
  billingInterval: Interval;
  subscription?: Subscription;
  isLoading: boolean;
  startTransition: TransitionStartFunction;
}

const ProductCard = ({
  plan,
  billingInterval,
  subscription,
  isLoading,
  startTransition,
}: ProductCardProps) => {
  const price = plan.item.amount ? plan.item.amount / 100 : '';
  // useMemo(() => {
  //   return product.prices?.find(
  //     (price) =>
  //       price.interval === billingInterval.interval &&
  //       price.interval_count === billingInterval.count
  //   );
  // }, [product, billingInterval]);

  const isSubscriptionActive =
    (subscription?.status as any as string) === "active";

  const handleSubscribe = async () => {
    try {
      const { sessionId } = await getServerData<{ sessionId: string }>(
        startTransition,
        // () => createCheckoutSession({ price: price! })
        () => { }
      );

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (err: any) {
      console.log(err);
      toast.error(err.message ?? "Something went wrong.");
    }
  };

  return (
    <div
      className={clsx(
        "px-3 md:px-10 rounded-lg md:mx-5 mb-5 md:mb-0 col-span-1",
        // product.metadata?.featured
        //   ? "bg-y py-3 md:py-8"
        //   : "bg-white py-2 md:py-5"
      )}
    >
      <h2 className="font-[600] text-2xl text-center text-neutral-200">{plan.item.name}</h2>

      <h3 className="text-center text-[24px] font-semibold text-neutral-100">
        {price && <>₹{(price)?.toLocaleString("en-IN")} </>}
        {!price && (
          <Link href="/contact" className="text-blue-500">
            Contact Us
          </Link>
        )}
      </h3>

      <hr
        className={clsx(
          "border border-zinc-500",
          // product.metadata?.featured ? "my-8" : "my-5" 
        )}
      />

      <div className="">
        {plan.features?.map((feature, i) => (
          <p
            className="space-x-2 mb-2 flex"
            key={`product-${plan.program}-feature-${i}`}
          >
            <FaCircleCheck size={20} className="mt-1 text-zinc-200" />
            <span className="">{feature}</span>
          </p>
        ))}

        <div className="flex items-center justify-center pt-8 pb-3">
          {!price && !isSubscriptionActive && (
            <Link href="/contact">
              <button className="px-5 py-2 rounded-lg  text-white bg-[#6557FF]">
                Contact Us
              </button>
            </Link>
          )}
          {price &&
            (!isSubscriptionActive ? (
              <button
                className="px-5 py-2 rounded-lg text-white bg-[#6557FF] center gap-2 disabled:opacity-75"
                disabled={isLoading}
                onClick={handleSubscribe}
              >
                Subscribe
                {isLoading && <Spinner size={15} />}
              </button>
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
  );
};

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

  // useDebug(new Date().toLocaleTimeString(), prices);

  // dynamically get billing interval based on product
  // const billingIntervals = [] as Interval[];

  const billingIntervals = useMemo(() => {
    let intervals = [] as Interval[];
    // let intervals = new Map<string, Interval>();

    if (!plans) return intervals;

    // get all intervals and period from plans and store it once in the state
    plans.forEach((plan) => {
      const { interval, period } = plan

      const exists = intervals.find(x => x.interval === interval && x.period === period)

      if (!exists) {
        intervals.push({
          interval,
          period: period as any,
        });

      }
    });

    console.log(intervals);

    setBillingInterval(intervals[0]);
    return intervals;
  }, [plans]);

  const onClose = () => {
    setOverlayVisible(false);

    // make sure scroll is enabled
    document.body.style.overflow = "auto";
  };

  const subscription = useProgram(
    (state) => state.subscriptions[plans?.[0]?.program]
  );
  const setSubscription = useProgram((state) => state.setSubscription);

  useDebug("subscription", subscription);

  useEffect(() => {
    if (subscription !== undefined) return;

    startTransition(() => {
      getSubscriptions(plans?.map((x) => x.id))
        .then((data) => {
          setSubscription(plans?.[0]?.program, data?.[0]);
        })
        .then(() => {
          // useProgram.getState().programs;
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [plans, subscription, setSubscription]);

  useDebug("plans", plans);

  // useEffect(() => {
  //   // disable scroll when overlay is open
  //   // if (overlayVisible) {
  //   //   document.body.style.overflow = "hidden";
  //   // } else {
  //   //   document.body.style.overflow = "auto";
  //   // }
  //   alert(`Overlay visable: ${overlayVisible}`)
  // }, [overlayVisible]);

  // if (!products?.length) return null;

  useDebug(billingIntervals)

  if (!plans || !plans.length) return <div>
    <h1>No plans found</h1>
  </div>

  const featured = {
    product1: true,
  };

  if (isPending)
    return (
      <div className="fixed top-0 left-0 w-screen center h-screen bg-black bg-opacity-30 backdrop-blur-md z-[99999999]">
        {/* show loader */}
        <Spinner size={45} />
      </div>
    );

  return (
    <Dialog open={overlayVisible} onOpenChange={onClose}>
      <DialogContent className="!min-w-min !z-[9999] fixed border-none !overflow-auto !min-h-min">
        <div className="!min-w-[90vw] !min-h-min !z-50 px-5 md:px-10 overflow-auto py-3 bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-[24px]">
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
                  {interval.interval > 1 &&
                    <>
                      {interval.interval} {capitalizeFirstLetter(periodMap[interval.period])}
                    </>}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 justify-center md:items-center py-6 px-5">
            {plans &&
              plans.length > 0 &&
              plans.filter(x =>
                x.period === billingInterval.period &&
                x.interval === billingInterval.interval
              )
                .map((plan, index) => (
                  <ProductCard
                    plan={plan}
                    billingInterval={billingInterval}
                    key={`product-${index}`}
                    isLoading={isLoading}
                    startTransition={startSubscriptionTransition}
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
              billingInterval={billingInterval}
              isLoading={isLoading}
              startTransition={startSubscriptionTransition}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
