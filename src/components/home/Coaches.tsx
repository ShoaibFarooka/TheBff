"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "@/styles/Home.module.scss";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Scrollbar, Mousewheel } from "swiper/modules";

// Import Assets
import coach1 from "@/assets/kindpng_218182.png";
import coach2 from "@/assets/Frame 39.png";
import coach3 from "@/assets/Frame 40.png";

const coches = [
  { name: "Gurpreet Singh", title: "E-REPS", image: coach1 },
  { name: "Arman", title: "E-REPS", image: coach2 },
  { name: "Birjot", title: "E-REPS", image: coach3 },
  { name: "Gurpreet Singh", title: "E-REPS", image: coach1 },
  { name: "Arman", title: "E-REPS", image: coach2 },
  { name: "Birjot", title: "E-REPS", image: coach3 },
  { name: "Gurpreet Singh", title: "E-REPS", image: coach1 },
  { name: "Arman", title: "E-REPS", image: coach2 },
  { name: "Birjot", title: "E-REPS", image: coach3 },
  { name: "Gurpreet Singh", title: "E-REPS", image: coach1 },
  { name: "Arman", title: "E-REPS", image: coach2 },
  { name: "Birjot", title: "E-REPS", image: coach3 },
];

// ===================== {Coach} =====================
const Coach = ({
  image,
  name,
  title,
}: {
  image: StaticImageData | string;
  name: string;
  title?: string;
}) => {
  return (
    <div className="flex-shrink-0 text-white mb-1 center flex-col py-3">
      <Image
        className="max-h-[200px] object-contain md:max-h-[431px] hover:scale-105 duration-300 mb-3 mx-auto"
        src={image}
        alt="/"
        width={280}
        height={1000}
      />

      <p className="text-center"> {name} </p>
      {/* {title && <p className="text-center"> {title} </p>} */}
    </div>
  );
};

type Coach = {
  image: StaticImageData | string;
  name: string;
  title?: string;
};

const Coaches = ({ coaches }: { coaches: Coach[] }) => {
  // const ref = React.useRef<HTMLDivElement>(null);

  // React.useEffect(() => {
  //   // keep scrolling to the right
  //   const interval = setInterval(() => {
  //     if (ref.current) {
  //       ref.current.scrollLeft += 50;
  //     }
  //   }, 50);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="mb-10 sm:px-[100px] sm:py-[60px] px-[40px] py-[20px]">
      <div className="">
        <p className="text-2xl sm:text-[50px] sm:mb-8 lg:mb-8 text-[#AFCCF8] font-[600] text-center">
          Meet Our Fitness Trainers
        </p>
        <p className="text-[#F2BD4D] font-[600] text-center sm:mb-12 lg:max-w-[50%] mx-auto">
          Our certified fitness gurus will turn your workouts from Blah to
          Ta-Da! Get personal training from the best online fitness coaches.
        </p>
      </div>

      <div className="mt-8">
        <Swiper
          modules={[Scrollbar, Mousewheel]}
          slidesPerView={2}
          // centeredSlides
          spaceBetween={2}
          draggable={true}
          simulateTouch={true}
          scrollbar={{
            el: ".swiper-scrollbar",
            hide: false,
            enabled: true,
            draggable: true,
            snapOnRelease: true,
            horizontalClass: "!bg-white/70",
          }}
          mousewheel={{
            sensitivity: 2,
            forceToAxis: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            // 700: {
            //   slidesPerView: 2,
            // },
            900: {
              slidesPerView: 3,
            },
          }}
          className="pt-4 min-h-min"
        >
          {coaches?.map((coach, index) => (
            <SwiperSlide className="mb-5" key={`slide-${index + 1}`}>
              <Coach
                key={"coach-" + index}
                image={coach.image}
                name={coach.name}
                title={coach.title}
              />
              {/* <p className="">Hello</p> */}
            </SwiperSlide>
          ))}

          <div className="slider-controller">
            <div className="swiper-scrollbar"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Coaches;
