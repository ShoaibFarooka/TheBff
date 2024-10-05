"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
// import div from "@/assets/div.png";
// import div1 from "@/assets/div (1).png";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Swiper CSS
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import div1 from "@/assets/div (1).png";
import div from "@/assets/div.png";
import { cn } from "@/lib/utils";
import { Autoplay, Mousewheel } from "swiper/modules";

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

export default function Classes({ classes = content }: { classes?: Class[] }) {
  const [active, setActive] = useState(0);

  if (!classes) {
    return (
      <div className="py-36 bg-neutral-100/20 flex justify-center items-center">
        No classes available
      </div>
    )
  }
  return (
    <div>
      <div className="h pb-28 flex justify-around flex-col lg:flex-row px-[20px] lg:px-[100px] lg:pt-[50px] ">
        <div className="w-full lg:w-1/2 lg:flex items-center justify-center my-8 lg:my-0">
          <div className="">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Mousewheel]}
              direction="vertical"
              className="mySwiper md:h-[80vh]"
              autoplay={{
                delay: 4 * 1000,
                disableOnInteraction: false,
              }}
              onSlideChange={(e: SwiperClass) => setActive(e.realIndex)}
              mousewheel={{ forceToAxis: true }}
              loop
              breakpoints={{
                320: {
                  direction: "horizontal",
                  spaceBetween: 15,
                },
                1080: {
                  direction: "vertical",
                  spaceBetween: 30,
                },
              }}
            >
              {classes?.map((c, index?: any) => (
                <SwiperSlide key={index} className="max-h-max">
                  <Image
                    key={index}
                    // className={` ${index === active && "shadow-lg shadow-white/40 scale-110"
                    // }`}
                    className={cn(
                      'w-72 !h-36 hover:shadow-white/20 hover:shadow hover:scale-110 duration-300 rounded-md',
                      index === active ? 'shadow-lg shadow-white/40 scale-110' : ''
                    )}
                    src={c.image!}
                    alt={c.title!}
                    onClick={() => setActive(index)}
                    width={300}
                    height={300}
                  />
                </SwiperSlide>
              ))}

              <div id="pagination"></div>
            </Swiper>
          </div>
        </div>

        <div className="w-full lg:w-1/2 content h-full my-auto">
          {/* Display content based on activeImageIndex */}
          <div className="w-full text-white mb-5">
            <div className="text-[#AFCCF8] text-center text-[24px] xl:text-[40px] font-bold">
              {classes[active]?.title}
            </div>
            {/* <div className="text-center text-[24px] md:text-[40px] font-bold text-[#FED25B]">
              made for you
            </div> */}
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-[#4A2F70] to-[#344363] px-[25px] py-5 lg:px-[55px] xl:py-10 xl:mt-20">
            <h1 className="text-center font-bold text-[24px] md:text-[30px] text-[#FED25B]">
              {classes[active]?.subTitle}
            </h1>
            <p className="text-center text-white text-md xl:text-lg">
              {/* Display content based on activeImageIndex */}
              {classes[active]?.description}
            </p>
            <div className="flex justify-center mt-5">
              <Link
                href={{
                  pathname: "/programs",
                  query: { program: classes[active]?.id },
                }}
              >
                <button className="rounded-lg py-2 px-20 bg-[#aeb5e0]">
                  Join Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
