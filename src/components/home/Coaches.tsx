"use client"
import React from 'react'
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
        className="h-[200px] object-contain md:h-[431px] md:object-cover hover:scale-105 duration-300 mb-3 mx-auto"
        src={image}
        alt="/"
        width={280}
        height={1000}
      />

      <p className="text-center"> {name} </p>
      {title && <p className="text-center"> {title} </p>}
    </div>
  );
};

// const settings: Settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 3,
//     autoplay: true,
//     // autoplaySpeed: 2000,
//     arrows: false,
//     dotsClass: styles.dots,
//     swipeToSlide: true,

//     responsive: [
//         {
//             breakpoint: 1024,
//             settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 2
//             },
//         },
//     ]
// };

const Coaches = () => {
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
      <div className="text-2xl sm:text-[50px]  ">
        <p className="sm:mb-8 lg:mb-10 text-[#AFCCF8]  font-[600] text-center">
          Relax your body and mind
        </p>
        <p className="text-[#F2BD4D] font-[600] text-center sm:mb-12 ">
          With your yoga coaches
        </p>
      </div>

      <div className="mt-8">
        {/* <Slider {...settings} className=''>
                {
                    coaches?.map((coach? :any, index? :any) => (
                        <Coach key={'coach-' + index} image={coach.image} name={coach.name} title={coach.title} />
                    ))
                }
            </Slider> */}
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
          {coches.map((coach, index) => (
            <SwiperSlide className="mb-5" key={`slide-${index + 1}`}>
              <Coach
                key={"coach-" + index}
                image={coach.image}
                name={coach.name}
                title={coach.title}
              />
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

export default Coaches