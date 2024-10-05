"use client";
import Image from "next/image";
import React from "react";
import { Mousewheel, Scrollbar } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import Achihievement from "@/assets/Artwork.png";
import tick from "@/assets/Not Started.png";

import "swiper/css";
import "swiper/css/scrollbar";

const CardsCarousel = () => {
  const ref = React.useRef<SwiperRef>(null);

  return (
    <>
      <div className="bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-10 py-5 lg:col-span-2">
        <h1 className="text-white text-[24px]">Achievements & Rewards</h1>

        <div className="text-white ">
          <Swiper
            modules={[Scrollbar, Mousewheel]}
            slidesPerView={3}
            // centeredSlides
            spaceBetween={20}
            draggable={true}
            simulateTouch={true}
            scrollbar={{
              el: ".swiper-scrollbar",
              hide: false,
              enabled: true,
              draggable: true,
              snapOnRelease: true,
            }}
            mousewheel={{
              sensitivity: 2,
              forceToAxis: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              900: {
                slidesPerView: 3,
              },
            }}
            className="pt-4 min-h-min"
          >
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <SwiperSlide className="mb-5" key={`slide-${i + 1}`}>
                  <div className="rounded-2xl shadow-[#9747FF]/10 shadow-lg px-4 py-4 w-full lg:w-[167px] bg-white/5 mx-auto">
                    <Image src={Achihievement} alt="" className="mb-5" />
                    <p className="mb-5">A Topic Name That Is Two Lines</p>
                    <div className="flex justify-between items-center">
                      <p className="text-[12px]">Recall 100%</p>
                      <Image src={tick} alt="" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}

            <div className="slider-controller">
              <div className="swiper-scrollbar"></div>
            </div>
          </Swiper>
        </div>

        {/* <div className="flex justify-center mt-5">
          <div className=" mb-5 h-2 rounded-full bg-gray-200 w-1/2">
            <div className="h-2 rounded-full bg-orange-500 w-[50%]"></div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default CardsCarousel;
