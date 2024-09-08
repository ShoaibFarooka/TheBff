"use client";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import Link from "next/link";
import { useMemo } from "react";
import { useDashboardState, UserData } from "./state";

// const d = dayjs();

const Subscriptions = () => {
  const { userData = {} as UserData } = useDashboardState();

  const subscriptions = useMemo(() => {
    if (!userData?.subscriptions) return [];
    return userData.subscriptions?.filter(
      (sub) => !["cancelled", "expired"].includes(sub.status)
    );
  }, [userData?.subscriptions])


  if (
    !subscriptions?.length
  )
    return (
      <div className="my-5 px-2 text-neutral-100">
        <p className="text-base text-center mb-3">
          You have no active subscriptions.
        </p>

        <div className="center">
          <Link href="/programs">
            <Button>Subscribe Now</Button>
          </Link>
        </div>
      </div>
    );

  return (
    <div className="my-5 px-2">
      <h2 className="text-xl text-y font-semibold">
        Your Subscriptions
      </h2>
      <hr className="bg-neutral-500 border-neutral-500" />

      <div className="mt-2">
        {userData?.subscriptions?.map((sub) => (
          <div key={sub._id as string} className="flex justify-between items-center">
            {/* Hello */}
            <p className="text-gray-200">{sub.plan?.name}</p>
            {/* <p className="text-gray-400">{sub.plan?.item?.amount / 100}</p> */}
            <p className="text-gray-400 text-sm">
              {sub.endDate ? dayjs(sub.endDate).format('DD/MM/YYYY') : "No expiry"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
