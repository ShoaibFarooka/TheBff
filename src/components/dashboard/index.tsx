"use client";
// import ProgressBar from '@/components/dashboard/ProgressBar'

import CardsCarousel from "@/components/dashboard/CardsCarousel";
import { Plan, Subscription } from "@/types/subscription";
import { Stats, User } from "@/types/user";
import { useMemo } from "react";
import Contact from "./Contact";
import BookSlot from "./sessions/BookSlot";
import { useDashboardState } from "./state";
import StatsGraph from "./StatsGraph";
import Subscriptions from "./Subscriptions";
import UserStats from "./UserStats";

type UserData = User & {
  classes: any[];
  stats: Stats;
  subscriptions: Array<
    Subscription & {
      plan: Plan;
    }
  >;
};

export default function Dashboard() {
  const { userData } = useDashboardState();

  // morning, afternoon, evening, night
  const { greeting, profileText } = useMemo(() => {
    if (!userData) return { greeting: "", profileText: "" };

    const time = new Date().getHours();
    const greeting =
      time < 12
        ? "Good Morning"
        : time < 18
          ? "Good Afternoon"
          : "Good Evening";

    const profileText = userData?.name
      ?.split(" ")
      ?.map((name: string) => name.charAt(0).toUpperCase())
      .join("");

    return { greeting, profileText };
  }, [userData]);

  return (
    <>
      <div
        className='w-full h-full py-28 lg:py-[90px] px-5 md:px-20'
      >
        <div className="flex justify-center items-center">
          <h1 className="text-white font-[600] text-[32px] lg:text-[48px] mb-10">
            {greeting}, <span className="text-[#F2BD4D]">{userData?.name}</span>
           </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* =================STATS================= */}
          <UserStats userStats={userData?.stats} />

          {/* ===================Scheduled Session================== */}
          <div className="bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl py-5 px-3 lg:px-10 lg:col-span-2 shadow-2xl shadow-[#4A2F70]/50">
            <BookSlot />
          </div>

          {/* =================PROFILE========================== */}
          <div className="bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-2 py-5 lg:col-span-1 shadow-2xl shadow-[#4A2F70]/50">
            <div className="flex justify-between px-3">
              {/* <Image src={profilePhoto} alt="" /> */}
              <div className="w-10 h-10 p-2 rounded-full bg-y/50 center select-none text-white font-bold">
                {profileText}
              </div>
            </div>

            <div className="my-3 px-3">
              <p className="text-white">{userData?.name}</p>
              <p className="text-gray-400">{userData?.email}</p>
              {/* <p className="text-gray-400">Male 22</p> */}
            </div>

            <Subscriptions />

            {/* <div className="my-5">
              <p className="text-white">Standard Plan</p>
              <p className="text-gray-400">Valid Untill : 23/06/2023</p>
            </div> */}
            {/* <button className="bg-gradient-to-r from-[#EC77AB] to-[#7873F5] text-white px-4 py-3 rounded-lg border  border-[#E577B0] ">
              Upgrade to Premium
            </button> */}
          </div>

          {/* ===============Stats Graph=================== */}
          <StatsGraph />

          {/* =======================Achievements ==================== */}
          <CardsCarousel />

          {/* ======================Contact Trainer============== */}
          <Contact />
        </div>
      </div>
    </>
  );
}
