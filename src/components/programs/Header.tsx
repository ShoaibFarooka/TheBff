"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";

import Image, { StaticImageData } from "next/image";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

// Swiper CSS
import { Program } from "@/types/program";
import { useSearchParams } from "next/navigation";
import { Toaster } from "react-hot-toast";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";


import div1 from "@/assets/div (1).png";
import div from "@/assets/div.png";

const content: Class[] = [
  {
    id: "dance",
    title: "Dance",
    subTitle: "Online",
    description: `Looking for a fun workout alternative? Try our online dance classes! You can get fit, learn different styles, or prepare for your wedding dance. It's really cool! Don't just take our word for it - come join us and see for yourself just how fun our classes are!`,
    image: div1,
  },
  {
    id: "at-gym",
    title: "At-Gym",
    subTitle: "Online",
    description: `Sweat now, shine later. We offer it all - Strength training, HIIT, Functional Fitness, Crossfit, Bodybuilding, and customized workout plans. These high-energy, high-intensity online fitness classes will take your usual gym routine to the next level! Get ready to crush your goals with our expert guidance.`,
    image: div,
  },
  {
    id: "at-home",
    title: "At-Home",
    subTitle: "Online",
    description: `Join our live interactive fitness workout classes to get fit without leaving your house. Choose from a variety of options including bodyweight training, resistance band training, HIIT, Pilates, and personalized workout plans tailored to your fitness goals.`,
    image: div1,
  },
  {
    id: "yoga",
    title: "Yoga",
    subTitle: "Online",
    description: `Want to reduce stress and stay mindful while you exercise? Try our online live yoga classes that focus on the full mind-body connection. Whether you're a seasoned yogi or a newbie to the mat, our interactive yoga classes offer something for everyone. Choose your type as Hatha, Vinyasa, Ashtanga, or Power Yoga or simply let us help you find it!`,
    image: div1,
  },
  {
    id: "meditation",
    title: "Meditation",
    subTitle: "Online",
    description: `Need a break from the daily grind? Our guided meditation classes offer a sanctuary of serenity and relaxation. Increase your focus and improve your overall well-being. Choose your starting point - beginner, intermediate, or advanced and Let BFF’s experts guide you to a healthier, more purposeful future`,
    image: div1,
  },
  {
    id: "nutrition",
    title: "Nutrition",
    subTitle: "Online",
    description: `Need some help with lifestyle changes? Want to say goodbye to fad diets and quick fixes?  We know it’s a battle! But your health is our priority. We're here to help you with weight management, PCOS (PCOD) relief plan, psoriasis relief, thyroid relief, general nutrition guidance, and more.`,
    image: div,
  },
  {
    id: "in-home",
    title: "In-Home",
    subTitle: "Online",
    description: `We guarantee the fitness results you’re looking for. Our unique in-home workout system is perfect if you have limited time and space. But that's not all – we prioritize convenience and affordability too! Time to prioritize your health and well-being without worrying about the cost of care. Ditch excuses with BFF’s In-Home workout sessions. `,
    image: div1,
  },
];

type Class = {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  image: string | StaticImageData;
};


const Header = ({
  programs,
  setCurrentProgram,
}: {
  programs: Program[];
  setCurrentProgram: React.Dispatch<React.SetStateAction<Program>>;
}) => {
  const ref = React.useRef<SwiperRef>(null);
  const searchParams = useSearchParams();

  // On page load, check if there is a program in the url and set the current program
  useEffect(() => {
    if (!ref.current) return;

    if (!programs || !programs.length) return;
    const programId = searchParams.get("program");
    if (!programId) return;

    const program = programs.find((x) => x.id === programId);
    if (!program) return;

    const sliderIndex = ref.current?.swiper.slides.findIndex(
      (x) => x.id === "header-slide-" + program.id
    );

    ref.current?.swiper.slideTo(sliderIndex ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, ref]);

  if (!programs?.length) return null;

  return (
    <div className="md:px-14 lg:px-28 flex gap-x-1 md:gap-x-5">
      <div className="hidden md:flex flex-col justify-center items-center">
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
          setCurrentProgram(programs[e.realIndex]);
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ el: "#header-pagination", clickable: true }}
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
        {programs?.map((program, index?: any) => (
          <SwiperSlide
            key={"header-slide-" + index}
            className="max-w-max relative"
            id={"header-slide-" + program.id}
          >
            <div className="relative max-h-max rounded-xl">
              <Image
                src={
                  program.image ??
                  `https://source.unsplash.com/random/400x400,weight-management${index}`
                }
                alt={program.name}
                // 200px / 16 = 12.5rem, 600px / 16 = 37.5rem, 500px / 16 = 31.25rem, 350px / 16 = 21.875rem
                className="w-[18rem] sm:w-[24rem] md:w-[31rem] lg:w-[37rem] h-[12rem] sm:h-[20rem] md:h-[22rem] duration-300 rounded-xl"
                height={500}
                width={500}
              />
              <div className="absolute w-full bottom-0 bg-black/30 px-4 py-2 text-white rounded-b-xl space-y-1">
                <h2 className="text-xl md:text-3xl font-semibold">{program.name}</h2>
                <p className="line-clamp-2">{program.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div id="header-pagination"></div>
      </Swiper>

      <div className="hidden md:flex flex-col justify-center items-center">
        <FaArrowCircleRight
          size={30}
          onClick={() => ref.current?.swiper.slideNext()}
          className="fill-white/30 hover:fill-purple-400 hover:text-white cursor-pointer"
        />
      </div>
      <Toaster />
    </div>
  );
};

export default Header;
