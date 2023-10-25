"use client";
// import cross from "@/assets/Cross.png";
import React, { useEffect, useState } from "react";
import tick from "@/assets/Vector 2.png";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

export default function ChoosePlan({
  priceContent = [],
  price,
  overlayVisible,
  setOverlayVisible,
}: {
  priceContent?: any;
  price?: any;
  overlayVisible: boolean;
  setOverlayVisible: (visible: boolean) => void;
}) {
  const onClose = () => {
    setOverlayVisible(!overlayVisible);
  };
  // const content = [
  //   {
  //     title1: '1999',

  //     title2 : '3499'
  //   }, {
  //     title1: '5999',

  //     title2 : '10499'

  //   }, {
  //     title1: '11999',

  //     title2 : '20999'

  //   },
  // ]
  const [active, setActive] = useState(0);

  // useEffect(() => {
  //   // disable scroll when overlay is open
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "unset";
  //   };
  // }, [overlayVisible]);

  if (!priceContent?.length) return null;

  return (
    <div className="absolute md:fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 backdrop-blur-md z-[99999999]">
      <div className="w-full h-full flex justify-center items-center z-50">
        <div className="w-full md:w-11/12 px-5 md:px-10 py-4 bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-[24px] ">
          <div className="w-full mx-auto relative flex justify-center items-center ">
            <button
              onClick={onClose}
              className="absolute top-0 left-0 md:top-2 md:left-2 bg-white rounded-2xl p-1 group hover:bg-red-500"
            >
              {/* <Image src={cross} alt="" /> */}
              <RxCross2
                size={20}
                className="fill-red-500 text-red-500 group-hover:text-white"
              />
            </button>
            <h2 className="text-2xl md:text-5xl font-bold text-[#F2BD4D] text-center mb-4 ">
              Choose Plan
            </h2>
          </div>

          <div className="w-full   mx-auto mb-4 ">
            <p className="text-white text-center text-xs md:text-base">
              Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus.
            </p>
          </div>
          <div className="flex justify-center items-center ">
            <div className="inline bg-white px-1 py-1 rounded-md space-x-1">
              <button
                className={`md:px-4 px-2 py-2 hover:bg-blue-300 hover:text-white rounded-md focus:text-white ${
                  active === 0 && "bg-[#6557FF] text-white"
                }`}
                onClick={() => setActive(0)}
              >
                1 month{" "}
              </button>
              <button
                className={`px-4 py-2 hover:bg-blue-300 hover:text-white rounded-md focus:text-white ${
                  active === 1 && "bg-[#6557FF] text-white"
                }`}
                onClick={() => setActive(1)}
              >
                3 month{" "}
              </button>
              <button
                className={`px-4 py-2 hover:bg-blue-300 hover:text-white rounded-md focus:text-white ${
                  active === 2 && "bg-[#6557FF] text-white"
                }`}
                onClick={() => setActive(2)}
              >
                6 month
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row   justify-center md:items-center py-6  ">
            <div className="bg-[#E7E7FF] px-3 py-2 md:py-7 md:px-10 rounded-lg md:mx-5 mb-5 md:mb-0">
              <h2 className="font-[600] text-2xl text-center">
                {priceContent[0]?.title}
              </h2>
              <h3 className="text-center text-[24px] font-semibold">
                {" "}
                ₹{price[active]?.title1}{" "}
                {/* <span className="text-gray-500 text-[16px] font-light">
                  /month
                </span> */}
              </h3>
              <hr className="border border-black mt-10" />
              <div className="mt-10">
                <div>
                  <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                    <Image src={tick} alt="" />
                  </button>
                  <span>{priceContent[0].content1}</span>
                </div>

                <div className="mt-5">
                  <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                    <Image src={tick} alt="" />
                  </button>
                  <span>{priceContent[0]?.content2}</span>
                </div>

                <div className="mt-5">
                  <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2 ">
                    <Image src={tick} alt="" />
                  </button>
                  <span>{priceContent[0]?.content3}</span>
                </div>
                <div className="flex items-center justify-center pt-8 pb-3">
                  <button className="px-5 py-2 rounded-lg  text-white bg-[#6557FF]">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#FFCC61] px-3 py-12 md:px-10 rounded-lg md:mx-5 mb-5 md:mb-0">
              <div className="text-center">
                <button className="text-white bg-[#6557FF] px-1 rounded-md">
                  -30%
                </button>
              </div>
              <h2 className="font-[600] text-2xl  text-center">
                {priceContent[1]?.title}
              </h2>
              <h3 className="text-center text-[24px] font-semibold">
                {" "}
                ₹{price[active]?.title2}{" "}
                {/* <span className="text-gray-500 text-[16px] font-light">
                  /month
                </span> */}
              </h3>
              <hr className="border border-black mt-10" />
              <div className="mt-10">
                <div>
                  <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                    <Image src={tick} alt="" />
                  </button>
                  <span>{priceContent[1]?.content1}</span>
                </div>

                <div className="mt-5">
                  <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                    <Image src={tick} alt="" />
                  </button>
                  <span>{priceContent[1]?.content2}</span>
                </div>

                <div className="mt-5">
                  <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                    <Image src={tick} alt="" />
                  </button>
                  <span>{priceContent[1]?.content3}</span>
                </div>
                <div className="flex items-center justify-center pt-8">
                  <button className="px-5 py-2 rounded-lg  text-white bg-[#6557FF]">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#E7E7FF] px-3 py-7 md:px-10 rounded-lg ">
              <h2 className="font-[600] text-2xl  text-center">
                {priceContent[2]?.title}
              </h2>
              <h3 className="text-center">Contact Us</h3>
              <hr className="border border-black mt-10" />
              <div className="mt-10">
                <div>
                  <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                    <Image src={tick} alt="" />
                  </button>
                  <span>{priceContent[2]?.content1}</span>
                </div>
                <div className="mt-5">
                  <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                    <Image src={tick} alt="" />
                  </button>
                  <span>{priceContent[2]?.content2}</span>
                </div>

                <div className="mt-5">
                  <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                    <Image src={tick} alt="" />
                  </button>
                  <span>{priceContent[2]?.content3}</span>
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
  );
}

// revalidate every 3 days= 172800 seconds
export const revalidate = 172800;