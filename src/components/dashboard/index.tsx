"use client";
// import ProgressBar from '@/components/dashboard/ProgressBar'

import CardsCarousel from "@/components/dashboard/CardsCarousel";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import BookSlot from "./BookSlot";


export default function Dashboard({ userdata }: { userdata: any }) {

  // morning, afternoon, evening, night
  const time = new Date().getHours();
  const greeting =
    time < 12 ? "Good Morning" : time < 18 ? "Good Afternoon" : "Good Evening";

  const profileText = userdata?.name
    ?.split(" ")
    ?.map((name: string) => name.charAt(0).toUpperCase())
    .join("");

  return (
    <>
      <div
        className={`w-full h-full py-[80px] px-[40px] lg:py-[90px] lg:px-[100px]`}
      >
        <div className="flex justify-center items-center">
          <h1 className="text-white font-[600] text-[32px] lg:text-[48px] mb-10">
            {greeting}, <span className="text-[#F2BD4D]">{userdata?.name}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* =================STATS================= */}

          <div className=" bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-5 py-5 lg:col-span-1 shadow-2xl shadow-[#4A2F70]/50">
            <div className="text-white flex justify-between">
              <h1 className="font-semibold text-[32px]">Stats</h1>
              <p>...</p>
            </div>
            <p className="text-[#fff]">
              Every large design company whether it’s a multi-national branding.
            </p>
            <div>
              <div className="text-white flex justify-between">
                <h1>Metric 1</h1>
                <p>65,376</p>
              </div>
              <div className="mb-5 h-2 rounded-full bg-gray-200">
                <div className="h-2 rounded-full bg-orange-500 w-[50%]"></div>
              </div>
            </div>
            <div>
              <div className="text-white flex justify-between">
                <h1>Metric 2</h1>
                <p>12,109</p>
              </div>
              <div className="mb-5 h-2 rounded-full bg-gray-200">
                <div className="h-2 rounded-full bg-[#4339F2] w-[50%]"></div>
              </div>
            </div>
            <div>
              <div className="text-white flex justify-between">
                <h1>Metric 3</h1>
                <p>132,645</p>
              </div>
              <div className="mb-5 h-2 rounded-full bg-gray-200">
                <div className="h-2 rounded-full bg-[#02A0FC] w-[50%]"></div>
              </div>
            </div>
            <div>
              <div className="text-white flex justify-between">
                <h1>Metric 4</h1>
                <p>100,426</p>
              </div>
              <div className="mb-5 h-2 rounded-full bg-gray-200">
                <div className="h-2 rounded-full bg-[#FF3A29] w-[50%]"></div>
              </div>
            </div>
          </div>

          {/* ===================Scheduled Session================== */}
          <div className=" bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl  py-5 px-3 lg:px-10 lg:col-span-2 shadow-2xl shadow-[#4A2F70]/50">
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
              url="https://calendly.com/thebffupdates/coaching-class"
              user={{
                email: userdata?.email,
                name: userdata?.name,
                phone: userdata?.phone,
              }}
            />
          </div>

          {/* =================PROFILE========================== */}
          <div className=" bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-5 py-5 lg:col-span-1 shadow-2xl shadow-[#4A2F70]/50">
            <div className="flex justify-between">
              {/* <Image src={profilePhoto} alt="" /> */}
              <div className="w-10 h-10 p-2 rounded-full bg-y/50 center select-none">
                {profileText}
              </div>
              <BiDotsHorizontalRounded color="white" />
            </div>
            <div className="my-5">
              <p className="text-white">{userdata?.name}</p>
              <p className="text-gray-400">{userdata?.email}</p>
              {/* <p className="text-gray-400">Male 22</p> */}
            </div>
            <div className="my-5">
              <p className="text-white">Your Subscriptions</p>
              <div className="mt-2">
                
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

          {/* ===============Stats=================== */}
          <div className=" bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-5 py-5 lg:col-span-1">
            <div className="text-white flex justify-between">
              <h1>Stats</h1>
              <p>...</p>
            </div>
            <div className="flex justify-center items-center ">
              <div className="w-full lg:w-[65%] h-[200px] mb-5  rounded-full bg-gray-200 border-[10px] border-orange-500 bg-gradient-to-r from-[#4A2F70] to-[#344363]  mx-[10%]  md:mx-[35%] xl:mx-[25%] px-10 py-10">
                <div className="flex justify-center items-center w-full h-full rounded-full bg-orange-500 text-white ">
                  <span className="md:rotate-90">47%</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-orange-500 mx-3 inline"></div>
                <span className="text-white">Restless</span>
                <div className="h-4 w-4 rounded-full bg-white inline mx-3"></div>
                <span className="text-white">Awake</span>
              </div>
            </div>
          </div>

          {/* =======================Achievements ==================== */}
          <CardsCarousel />

          {/* ======================Contact Trainer============== */}
          <div className=" bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-5 py-5 lg:col-span-1">
            <h1 className="text-white text-[24px] mb-4">Contact Trainer</h1>

            <textarea
              className="my-10 p-5 rounded-lg w-full "
              placeholder="Type your query here"
            />
            <div className="text-center">
              <button className="bg-[#514ED8] text-white px-5 xl:px-[80px] py-3 rounded-lg">
                Send query
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
