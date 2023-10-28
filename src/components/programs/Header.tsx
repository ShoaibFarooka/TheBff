"use client";
import React, { useState } from "react";
import { Swiper, SwiperRef, SwiperClass, SwiperSlide } from "swiper/react";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

// Swiper CSS
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Assets
// import slide1 from "../../../public/images/stock/dance.jpeg";
// import slide2 from "../../../public/images/stock/gym.jpeg";
// import slide3 from "../../../public/images/stock/home-gym.jpeg";

// import slide4 from "../../../public/images/stock/yoga.jpeg";
// import slide5 from "../../../public/images/stock/meditation.jpeg";
// import slide6 from "../../../public/images/stock/nutrition.jpeg";
// import slide7 from "../../../public/images/stock/in-home.jpeg";

// const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];

const Header = ({
  management,
  active,
  setActive,
}: {
  management?: any;
  active?: any;
  setActive?: any;
}) => {
  const ref = React.useRef<SwiperRef>(null);
  // const [active, setActive] = useState(0);

  return (
    <div className="md:px-14 lg:px-28 flex gap-x-1 md:gap-x-5">
      <div className="flex flex-col justify-center items-center">
        <FaArrowCircleLeft
          size={30}
          onClick={() => ref.current?.swiper.slidePrev()}
          className="fill-white/30 hover:fill-purple-400 hover:text-white cursor-pointer"
        />
      </div>

      <Swiper
        modules={[EffectCoverflow, Pagination, Navigation]}
        effect="coverflow"
        // grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        onSlideChange={(e: SwiperClass) => {
          setActive(e.realIndex);
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          hideOnClick: true,
        }}
        breakpoints={{
          640: {
            coverflowEffect: {
              depth: 0,
            },
          },
          768: {
            coverflowEffect: {
              depth: 100,
            },
          },
          1024: {
            coverflowEffect: {
              depth: 200,
            },
          },
        }}
        className="custom-swiper-container"
        ref={ref}
      >
        {management?.map((slide?: any, index?: any) => (
          <SwiperSlide key={"slide-" + index} className="max-w-max relative">
            <Image
              src={slide.image}
              alt={"Slide " + index + 1}
              className="w-[200px] sm:w-[400px] md:w-[500px] lg:w-[700px] md:h-[400px] duration-300"
              height={500}
              width={500}
            />
            <div className="w-full h-[20%] absolute bottom-0  bg-opacity-50 text-[8px] md:text-base bg-black p-4 text-white">
              <p>{slide.content}</p>
            </div>
          </SwiperSlide>
        ))}

        <div className="slider-controller">
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>

      <div className="flex flex-col justify-center items-center">
        <FaArrowCircleRight
          size={30}
          onClick={() => ref.current?.swiper.slideNext()}
          className="fill-white/30 hover:fill-purple-400 hover:text-white cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
