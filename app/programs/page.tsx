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

import cross from "@/assets/Cross.png";
import tick from "@/assets/Vector 2.png";

const comparison = [
  { title: "Live Interaction Classes", standard: "Yes", premium: "Yes" },
  { title: "Frequency", standard: "18 Sessions", premium: "Unlimited" },
  { title: "Diet Assitance", standard: "No", premium: "Yes" },
  { title: "Pause Membership", standard: "No", premium: "Yes" },
  { title: "No Cost EMI", standard: "No", premium: "Yes" },
];

export default function Page() {
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
  const onClose = () => {
    setOverlayVisible(!overlayVisible);
  };

  return (
    <>
      <div className="mt-20 md:mt-32 flex flex-col justify-center items-center w-full relative group px-5 md:px-14">
        <h1 className="font-semibold text-center text-[40px] lg:text-[72px] text-[#F2BD4D] mb-12">
          {" "}
          Weight Management{" "}
        </h1>

        <Header />
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
          <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 backdrop-blur-md z-[99999999] px-10 py-5">
            <div className="w-full h-full flex justify-center z-50">
              <div className="w-11/12 px-10 py-10 bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-[24px] ">
                <div className="w-full   mx-auto relative flex justify-center items-center ">
                  <button
                    onClick={onClose}
                    className="absolute top-2 left-2 bg-white rounded-2xl p-1 group hover:bg-red-500"
                  >
                    {/* <Image src={cross} alt="" /> */}
                    <RxCross2 size={20} className="fill-red-500 text-red-500 group-hover:text-white" />
                  </button>
                  <h2 className="text-5xl font-bold text-[#F2BD4D] text-center mb-4 ">
                    Choose Plan
                  </h2>
                </div>
                <div className="w-full   mx-auto mb-4 ">
                  <p className="text-white text-center">
                    Gorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam eu turpis molestie, dictum est a, mattis tellus.
                  </p>
                </div>
                <div className="flex justify-center items-center ">
                  <div className="inline bg-white px-1 py-1 rounded-md">
                    <button className="px-4 py-2 hover:bg-blue-300 hover:text-white rounded-md">
                      {" "}
                      1 month{" "}
                    </button>
                    <button className="px-4 py-2 hover:bg-blue-300 hover:text-white rounded-md">
                      3 month{" "}
                    </button>
                    <button className="px-4 py-2 hover:bg-blue-300 hover:text-white rounded-md">
                      6 month
                    </button>
                  </div>
                </div>
                <div className="flex justify-center items-center py-12 ">
                  <div className="bg-[#E7E7FF] py-7 px-10 rounded-lg mx-5">
                    <h2 className="font-[600] text-2xl text-center">
                      Standard
                    </h2>
                    <h3 className="text-center">1999 month</h3>
                    <hr className="border border-black mt-10" />
                    <div className="mt-10">
                      <div>
                        <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                          <Image src={tick} alt="" />
                        </button>
                        <span>Create personal dashboard</span>
                      </div>

                      <div className="mt-5">
                        <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                          <Image src={tick} alt="" />
                        </button>
                        <span>Trainer Support</span>
                      </div>

                      <div className="mt-5">
                        <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2 ">
                          <Image src={tick} alt="" />
                        </button>
                        <span>Rewards & Achievement's</span>
                      </div>
                      <div className="flex items-center justify-center pt-8 pb-3">
                        <button className="px-5 py-2 rounded-lg  text-white bg-[#6557FF]">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFCC61] py-12 px-10 rounded-lg mx-5">
                    <div className="text-center">
                      <button className="text-white bg-[#6557FF] px-1 rounded-md">
                        -30%
                      </button>
                    </div>
                    <h2 className="font-[600] text-2xl  text-center">
                      Premium
                    </h2>
                    <h3 className="text-center">3499 month</h3>
                    <hr className="border border-black mt-10" />
                    <div className="mt-10">
                      <div>
                        <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                          <Image src={tick} alt="" />
                        </button>
                        <span>All features in Stadard</span>
                      </div>

                      <div className="mt-5">
                        <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                          <Image src={tick} alt="" />
                        </button>
                        <span>Pause Membership on your ease</span>
                      </div>

                      <div className="mt-5">
                        <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                          <Image src={tick} alt="" />
                        </button>
                        <span>Custom Nutrition Plans</span>
                      </div>
                      <div className="flex items-center justify-center pt-8">
                        <button className="px-5 py-2 rounded-lg  text-white bg-[#6557FF]">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#E7E7FF] py-7 px-10 rounded-lg mx-5">
                    <h2 className="font-[600] text-2xl  text-center">
                      Enterprise
                    </h2>
                    <h3 className="text-center">Contact Us</h3>
                    <hr className="border border-black mt-10" />
                    <div className="mt-10">
                      <div>
                        <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                          <Image src={tick} alt="" />
                        </button>
                        <span>All features in Premium Plan</span>
                      </div>

                      <div className="mt-5">
                        <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                          <Image src={tick} alt="" />
                        </button>
                        <span>Bulk Discount</span>
                      </div>

                      <div className="mt-5">
                        <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                          <Image src={tick} alt="" />
                        </button>
                        <span>24*7 Support</span>
                      </div>
                      <div className="flex items-center justify-center pt-8">
                        <button className="px-5 py-2 rounded-lg  text-white bg-[#6557FF]">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ContactForm />
    </>
  );
}
