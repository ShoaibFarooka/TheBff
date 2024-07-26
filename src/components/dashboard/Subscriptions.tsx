"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useDashboardState } from "./state";

const Subscriptions = () => {
  const { userData } = useDashboardState();

  if (
    !userData?.subscriptions?.length ||
    !userData?.subscriptions.every((sub) => sub.status === "active")
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
            <p className="text-gray-400">{sub.plan?.item?.amount / 100}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
