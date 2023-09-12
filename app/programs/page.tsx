/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled, RxCross2 } from "react-icons/rx";
import Image from "next/image";
import StayHealthy from "@/components/programs/StayHealthy";
import Header from "@/components/programs/Header";
import ContactForm from "@/components/ContactForm";

import image1 from "@/assets/Cardio.png";
import image2 from "@/assets/Strength.png";
import image3 from "@/assets/Yoga.png";
import image4 from "@/assets/No equipment.png";
import image5 from "@/assets/Toning.png";
import image6 from "@/assets/Walking.png";
import ChoosePlan from "@/components/programs/ChoosePlan";
// import { getPageData } from "@/lib/db";



const comparison = [
  { title: "Live Interaction Classes", standard: "Yes", premium: "Yes" },
  { title: "Frequency", standard: "18 Sessions", premium: "Unlimited" },
  { title: "Diet Assitance", standard: "No", premium: "Yes" },
  { title: "Pause Membership", standard: "No", premium: "Yes" },
  { title: "No Cost EMI", standard: "No", premium: "Yes" },
];

export default function Programs() {
  // const pageData =   getPageData("Programs") as any;
  // console.log(pageData)
  // const management = pageData?.management;
  // const stayHealthy = pageData?.stayHealthy;

  const [isOpen, setIsOpen] = useState(true);

  // const openPopup = () => {
  //   setIsOpen(true);
  // };

  const closePopup = () => {
    setIsOpen(false);
  };

  const [overlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  return (
    <>
      <div className="mt-20 md:mt-32 flex flex-col justify-center items-center w-full relative group px-5 md:px-14">
        <h1 className="font-semibold text-center text-[40px] lg:text-[72px] text-[#F2BD4D] mb-12">
          {" "}
          Weight Management{" "}
        </h1>

        <Header management={null as any} />
      </div>

      <StayHealthy />

      {/* ============================== Unlimited Variety ======================= */}
      <div className="px-4 md:px-8 lg:px-12 mb-20 mt-20">
        <div className="rounded-3xl bg-gradient-to-r from-[#4A2F70] to-[#344363] px-3 md:px-10 py-5 md:py-10">
          <div className="text-white ">
            <p className="my-5 text-center font-semibold text-[30px] lg:text-[64px]">
              Unlimited variety
            </p>
            <p className="my-5 text-center">Unlimited variety</p>
            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-3 md:gap-10">
                <Image src={image1} alt="" />
                <Image src={image2} alt="" />
                <Image src={image3} alt="" />
                <Image src={image4} alt="" />
                <Image src={image5} alt="" />
                <Image src={image6} alt="" />
              </div>
            </div>
            <div className="flex justify-center my-10">
              {/* <button className="rounded-xl px-10 py-2.5 font-semibold bg-blue-500 border-solid bg-opacity-100 border-gradient">
                Start training now
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* ============================== Pricing ======================= */}
      <div className="my-20 relative">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-center font-semibold text-[40px] lg:text-[72px] text-[#F2BD4D]">
            Choose Your Plan
          </h1>
          <p className="text-blue-200 text-center">
            {" "}
            best prices offered , choose the plan that suits you{" "}
          </p>

          <div className="w-full mt-10">
            <div className="w-full grid grid-cols-3 text-white/90 md:text-xl px-4 md:px-0">
              <div className="col-span-1 mb-10"> </div>
              <div className="col-span-1 mb-10 text-center">
                <h3 className="text-white text-2xl md:text-3xl font-semibold">
                  {" "}
                  Standard{" "}
                </h3>
              </div>
              <div className="col-span-1 mb-10 text-center">
                <h3 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#F2BD4D] to-red-600">
                  {" "}
                  Premium{" "}
                </h3>
              </div>

              {comparison.map((item, index) => (
                <>
                  <div className="col-span-1 py-3" key={"comparison-" + index}>
                    <h3 className="font-bold"> {item.title} </h3>
                  </div>
                  <div className="col-span-1 py-3 border border-gray-400/40">
                    {item.standard == "No" ? (
                      <RxCrossCircled
                        size={23}
                        className="text-3xl text-gray-500 mx-auto"
                      />
                    ) : (
                      <IoMdCheckmarkCircleOutline
                        size={23}
                        className="text-3xl text-blue-400 mx-auto"
                      />
                    )}
                    <h3 className="text-center"> {item.standard} </h3>
                  </div>
                  <div className="col-span-1 py-3 border border-gray-400/40">
                    {item.premium == "No" ? (
                      <RxCrossCircled
                        size={23}
                        className="text-3xl text-gray-500 mx-auto"
                      />
                    ) : (
                      <IoMdCheckmarkCircleOutline
                        size={23}
                        className="text-3xl text-blue-400 mx-auto"
                      />
                    )}
                    <h3 className="text-center"> {item.premium} </h3>
                  </div>
                </>
              ))}

              <div className="col-span-1 py-3"></div>
              <div className="col-span-1 py-3 border border-gray-400/40 center flex-col">
                <p className="text-base md:text-xl text-center mb-2.5">
                  {" "}
                  Starting at Rs. 1999/- month{" "}
                </p>
                <button
                  onClick={toggleOverlay}
                  className="shadow-xl shadow-red-800/10 mx-auto rounded px-2 py-1.5 border-none outline-none bg-white text-red-500 font-semibold focus:border"
                >
                  {" "}
                  View Plans{" "}
                </button>
              </div>
              <div className="col-span-1 py-3 border border-gray-400/40 center flex-col">
                <p className="text-base md:text-xl text-center mb-2.5">
                  {" "}
                  Starting at Rs. 3499/- month{" "}
                </p>
                <button
                  onClick={toggleOverlay}
                  className="shadow-xl shadow-red-800/10 mx-auto rounded px-2 py-1.5 border-none outline-none bg-white text-red-500 font-semibold focus:border"
                >
                  {" "}
                  View Plans{" "}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==========OVERLAY============ */}
        {overlayVisible && (
          <ChoosePlan
            overlayVisible={overlayVisible}
            setOverlayVisible={setOverlayVisible}
          />
        )}
      </div>

      <ContactForm />
    </>
  );
}
