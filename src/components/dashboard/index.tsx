"use client";
// import ProgressBar from '@/components/dashboard/ProgressBar'

import CardsCarousel from "@/components/dashboard/CardsCarousel";
import { Plan, Subscription } from "@/types/subscription";
import { Stats, User } from "@/types/user";
import { useMemo } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import BookSlot from "./BookSlot";
import Contact from "./Contact";
import { useDashboardState } from "./state";
import StatsGraph from "./StatsGraph";
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
        className={`w-full h-full py-[80px] px-[40px] lg:py-[90px] lg:px-[100px]`}
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
            {/* <h1 className="font-semibold text-[32px] text-center text-[#AFCCF8] mb-10">
              Scheduled Session
            </h1>
            <div className="flex justify-center">
              <div className="text-white flex justify-between rounded-lg px-4  py-4 border border-white my-4 w-full lg:w-4/5 items-center">
                <p className="text-xs lg:text-base"> 10:00 AM</p>
                <p className="text-xs lg:text-base">23rd April 2023</p>
                <button className="bg-[#E59F0B] px-5 py-2 text-white rounded-lg">
                  Reschedule
                </button>
              </div>
            </div>

            <div className="flex justify-center my-5">
              <button className="bg-[#514ED8] text-white px-[70px] py-3 rounded-lg">
                Join Meeting
              </button>
            </div>
            */}
            <BookSlot
            // url="https://calendly.com/thebffupdates/coaching-class"
            />
          </div>

          {/* =================PROFILE========================== */}
          <div className="bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-2 py-5 lg:col-span-1 shadow-2xl shadow-[#4A2F70]/50">
            <div className="flex justify-between px-3">
              {/* <Image src={profilePhoto} alt="" /> */}
              <div className="w-10 h-10 p-2 rounded-full bg-y/50 center select-none">
                {profileText}
              </div>
              <BiDotsHorizontalRounded color="white" />
            </div>

            <div className="my-5 px-3">
              <p className="text-white">{userData?.name}</p>
              <p className="text-gray-400">{userData?.email}</p>
              {/* <p className="text-gray-400">Male 22</p> */}
            </div>

            <div className="my-5 px-2">
              <p className="text-lg text-white bg-blue-50/25 rounded-md p-1">
                Your Subscriptions
              </p>
              <div className="mt-2">
                {userData?.subscriptions?.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex justify-between items-center"
                  >
                    {/* Hello */}
                    <p className="text-gray-200">{sub.plan?.item?.name}</p>
                    <p className="text-gray-400">
                      {sub.plan?.item?.amount / 100}
                    </p>
                  </div>
                ))}
              </div>
            </div>

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
