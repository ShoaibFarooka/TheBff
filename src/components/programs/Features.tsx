"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import { cn } from "@/lib/utils";
import { Program } from "@/types/program";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const ImageWithTitle = ({
  image,
  title,
  active1 = false,
}: {
  image: StaticImageData | string;
  title: string;
  active1?: boolean;
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

interface Props {
  program: Program;
}

const ProgramFeatures = ({ program }: Props) => {
  // const [click, handleClick] = useState(0);
  // const searchParams = useSearchParams();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setSelected(0);
  }, [program]);

  if (!program?.features?.length) return null;

  return (
    <>
      {/* ============================== Program Features ======================= */}
      <div className="my-20">
        <div>
          <p className="text-center font-semibold text-3xl lg:text-5xl mb-4 text-[#F2BD4D]">
            {program.featureTitle}
          </p>

          <p className="text-center text-white px-5">
            {program.featureDescription}
          </p>
        </div>

        {/* use swiper slider instead of grid */}
        <div className="max-w-max mx-auto md:px-10">
          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={3}
            loopedSlides={0}
            className="mx-auto px-3"
            spaceBetween={5}
            effect="slide"
            loop={true}
            onSlideChange={(e: SwiperClass) => setSelected(e.realIndex)}
            pagination={{ el: "#pagination", clickable: true }}
          >
            {program.features.map((feature?: any, index?: any) => (
              <SwiperSlide
                key={`${program.id}-feature-${index}`}
                className={cn("max-w-max relative mx-4 grow !py-0")}
              >
                <Image
                  key={`slide-img-${index}`}
                  src={feature.image}
                  alt={"Slide " + 1}
                  className={cn(
                    "w-full max-w-full h-28 md:h-48 lg:h-56 cursor-pointer rounded-lg object-cover shadow duration-300 my-10",
                    selected === index ? "shadow-xl shadow-yellow-100/30" : ""
                  )}
                  height={300}
                  width={300}
                  onClick={() => setSelected(index)}
                />
              </SwiperSlide>
            ))}

            <div className="flex justify-center items-center">
              <div
                id="pagination"
                className="mx-auto space-x-2 max-w-max bg-white/20 px-4 !py-1 rounded-full"
              />
            </div>
          </Swiper>
        </div>
      </div>

      <div className="mb-20 mt-20 px-5">
        <div className="mb-7 md:mb-10 max-w-4xl mx-auto">
          <h1 className="text-center font-semibold text-3xl lg:text-4xl mb-20 text-[#F2BD4D] leading-tight">
            {program.features[selected].title}
          </h1>
        </div>
        <div className="flex px-5 flex-col md:flex-row justify-around lg:px-[80px] gap-y-10 h-full">
          <div className="w-full md:w-1/2 h-full">
            <Image
              src={program.features[selected].image ?? ""}
              alt=""
              className="max-w-full md:max-w-[75%] transition-all duration-200 rounded-xl my-auto"
              width={500}
              height={500}
            />
          </div>

          <div className="w-full md:w-1/2 text-white px-5 lg:px-[50px]">
            <p className="text-center font-semibold text-2xl lg:text-3xl mb-7 md:mb-10 text-[#AFCCF8] transition-all duration-200">
              {program.features[selected].name}
            </p>
            <p className="text-[17px] text-center transition-all duration-200">
              {program.features[selected].description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramFeatures;
