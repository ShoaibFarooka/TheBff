"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

import group1 from "@/assets/fruits.webp";
import group2 from "@/assets/Rectangle 1969.png";
import group3 from "@/assets/Rectangle 1970.png";
import group4 from "@/assets/Rectangle 1970 (1).png";
import rectangle from "@/assets/Rectangle 1976.png";
import { Swiper, SwiperRef, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";

const ImageWithTitle = ({
  image,
  title,
  active1 = false,
}: {
  image: StaticImageData | string;
  title: string;
  active1?: boolean;
  // i: number
}) => {
  return (
    <div className="col-span-1 w-full h-[12rem] md:h-[18rem] lg:h-[22rem] cursor-pointer">
      <div className={"relative mx-auto w-[90%] h-full "}>
        <Image
          className={
            "w-[100%] h-full shadow-xl hover:shadow-purple-400 rounded-xl mx-auto " +
            (active1 && "shadow-purple-400/60")
          }
          src={image}
          alt={title ?? ""}
        />
        <p className="text-white absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-purple-400 rounded-md px-5 py-1 md:px-7 md:py-2 lg:px-10 lg:py-3">
          {title}
        </p>
      </div>
    </div>
  );
};

const StayHealthy = ({
  stayHealthy,
  active,
  setActive,
}: {
  stayHealthy?: any;
  active?: any;
  setActive?: any;
}) => {
  // const [active, setActive] = React.useState(0);
  // const interval = React.useRef<any>(
  //   setInterval(() => {
  //     setActive((prev) => prev + 1);
  //   }, 5000)
  // );

  // const handleClick = (i: number) => {
  //   setActive(i);
  // clearInterval(interval.current);
  // interval.current = setInterval(() => {
  //   setActive((prev) => prev + 1);
  // }, 5000);
  // };
  const [click, handleClick] = useState(0);

  return (
    <>
      {/* ============================== Stay Healthy ======================= */}
      <div className="my-20">
        <div>
          <p className="text-center font-semibold text-2xl sm:text-[50px] mb-4 text-[#F2BD4D]">
            {stayHealthy[active].mainTitle}
          </p>

          <p className="text-center text-white px-5">
            {stayHealthy[active].mainSubTitle}
          </p>
        </div>

        {/* use swiper slider instead of grid */}
        <Swiper
          className="mx-auto"
          modules={[Pagination, Navigation]}
          // centeredSlides
          slidesPerView={3}
          spaceBetween={3}
          effect="slide"
          loop={true}
          onSlideChange={(e: SwiperClass) => {
            handleClick(e.realIndex);
          }}
          pagination={{ el: "#pagination", clickable: true }}
        >
          {stayHealthy[active].arr.map((slide?: any, index?: any) => (
            <SwiperSlide key={"slide-" + index} className="max-w-max relative">
              <Image
                key={index}
                src={slide.image}
                alt={"Slide " + 1}
                className="w-4/5 sm:w-[300px] rounded-lg md:w-[300px] lg:w-[400px] object-cover h-[250px] shadow duration-300 mx-10 my-10"
                height={300}
                width={300}
                onClick={() => handleClick(index)}
              />
            </SwiperSlide>
          ))}
          <div className="flex justify-center items-center">
            <div id="pagination" className="mx-auto shadow-md"></div>
          </div>
        </Swiper>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-10">
          {stayHealthy[active].arr.map((slide?: any, index?: any) => (
            <Image
              key={index}
              src={slide.image}
              alt={"Slide " + 1}
              className="w-4/5 sm:w-[300px] rounded-lg md:w-[300px] lg:w-[400px] object-cover h-[250px] duration-300 mx-10 my-10"
              height={300}
              width={300}
              onClick={() => handleClick(index)}
            />
          ))}
        </div> */}
      </div>

      <div className="mb-20 mt-20 px-5">
        <div className="mb-7 md:mb-10 max-w-4xl mx-auto">
          <h1 className="text-center font-semibold text-2xl sm:text-[50px] mb-20 text-[#F2BD4D] leading-tight">
            {stayHealthy[active].arr[click].title}
          </h1>
        </div>
        <div className="flex px-5 flex-col md:flex-row justify-around lg:px-[80px] gap-y-10 h-full">
          <div className="w-full md:w-1/2 h-full">
            <Image
              src={stayHealthy[active].arr[click].image}
              alt=""
              className="max-w-full md:max-w-[75%] transition-all duration-200 rounded-xl my-auto"
              width={500}
              height={500}
            />
          </div>

          <div className="w-full md:w-1/2 text-white px-5 lg:px-[50px]">
            <p className="text-center font-semibold text-[40px] mb-7 md:mb-10 text-[#AFCCF8] transition-all duration-200">
              {stayHealthy[active].arr[click].subTitle}
            </p>
            <p className="text-[17px] text-center transition-all duration-200">
              {stayHealthy[active].arr[click].description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StayHealthy;
