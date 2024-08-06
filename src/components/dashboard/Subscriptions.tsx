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
      <p className="text-lg text-white bg-blue-50/25 rounded-md p-1">
        Your Subscriptions
      </p>
      <div className="mt-2">
        {userData?.subscriptions?.map((sub) => (
          <div key={sub.id} className="flex justify-between items-center">
            {/* Hello */}
            <p className="text-gray-200">{sub.plan?.item?.name}</p>
            {/* <p className="text-gray-400">{sub.plan?.item?.amount / 100}</p> */}
            <p className="text-gray-400 text-sm">
              {sub.current_end ? dayjs(sub.current_end).format('DD/MM/YYYY') : "No expiry"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
