"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";

import { cn } from "@/lib/utils";
import { Feature, Program } from "@/types/program";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";

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
      <div className={"relative mx-auto w-[90%] h-full"}>
        <Image
          className={
            "w-[100%] h-80 shadow-xl hover:shadow-purple-400 rounded-xl mx-auto my-auto" +
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
  setCurrentFeature: React.Dispatch<React.SetStateAction<Feature>>;
}

const ProgramFeatures = ({ program, setCurrentFeature }: Props) => {
  // const [click, handleClick] = useState(0);
  // const searchParams = useSearchParams();
  const ref = useRef<SwiperRef>(null);
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

        <div className="grid grid-cols-12 gap-x-1 md:gap-x-5 max-w-5xl mx-auto px-5">

          <div className="col-span-1 flex flex-col justify-center items-center">
            <FaArrowCircleLeft
              size={30}
              onClick={() => ref.current?.swiper.slidePrev()}
              className="fill-white/30 hover:fill-purple-400 hover:text-white cursor-pointer"
            />
          </div>

          {/* use swiper slider instead of grid */}
          <div className="col-span-10">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              pagination={{
                clickable: true,
                el: "#pagination",
              }}
              modules={[Mousewheel, Pagination]}
              direction="horizontal"
              className="mySwiper"
              onSlideChange={(e: SwiperClass) => {
                setSelected(e.realIndex)
                setCurrentFeature(program.features[e.realIndex])
              }}
              mousewheel={{ forceToAxis: true }}
              breakpoints={{
                320: {
                  spaceBetween: 0,
                  slidesPerView: 1
                },
                1080: {
                  spaceBetween: 30,
                  slidesPerView: 3,
                },
              }}
              ref={ref}
            >
              {program.features.map((feature?: any, index?: any) => (
                <SwiperSlide
                  key={`${program.id}-feature-${index}`}
                  className=""
                >
                  <div className="max-w-max max-h-max relative mx-auto">
                    <Image
                      key={`slide-img-${index}`}
                      src={feature.image}
                      alt={"Slide " + 1}
                      className={cn(
                        "w-[13rem] h-[16rem] mx-auto cursor-pointer rounded-lg object-cover shadow duration-300 my-10",
                        selected === index ? "shadow-xl shadow-[#B5BCFF] scale-105" : ""
                      )}
                      height={392}
                      width={332}
                      onClick={() => {
                        setSelected(index)
                        setCurrentFeature(feature)
                      }}
                    />

                    <div className="absolute bg-[#B5BCFF] top-full -translate-y-1/2 left-1/2 -translate-x-1/2 w-[81%] rounded-md">
                      <p className="text-center p-1.5 font-semibold">
                        {feature.title}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              <div className="flex justify-center items-center">
                <div
                  id="pagination"
                  className="mx-auto space-x-2 max-w-max bg-white/20 px-4 !py-1 rounded-full"
                />
                <div className="prev"></div>
                <div className="next"></div>
              </div>
            </Swiper>
          </div>

          <div className="col-span-1 flex flex-col justify-center items-center">
            <FaArrowCircleRight
              size={30}
              onClick={() => ref.current?.swiper.slideNext()}
              className="fill-white/30 hover:fill-purple-400 hover:text-white cursor-pointer"
            />
          </div>

        </div>

      </div>

      <div className="mb-20 mt-20 px-5">
        <div className="mb-7 md:mb-10 max-w-4xl mx-auto">
          <h1 className="text-center font-semibold text-3xl lg:text-4xl md:mb-20 text-[#F2BD4D] leading-tight">
            {program.features[selected].heading}
          </h1>
        </div>

        <div className="flex px-5 flex-col md:flex-row justify-around lg:px-[80px] gap-y-10 gap-5 h-full">
          <div className="w-full md:w-1/2 h-full bg-green-100/0 lg:pr-[3rem] my-auto">
            <Image
              src={program.features[selected].image ?? ""}
              alt={program.features[selected].title ?? ""}
              className="max-w-full lg:max-w-[75%] h-60 md:h-72 object-cover transition-all duration-200 rounded-xl ml-auto"
              width={500}
              height={500}
            />
          </div>

          <div className="w-full md:w-1/2 text-white lg:px-[3rem] my-auto bg-blue-100/0">
            <div className="rounded-3xl bg-gradient-to-r from-[#4A2F70] to-[#344363] px-[25px] py-5 lg:px-[55px] xl:py-10">
              <p className="text-center font-semibold text-2xl lg:text-3xl mb-7 md:mb-10 text-[#AFCCF8] transition-all duration-200">
                {program.features[selected].subheading}
              </p>
              <p className="text-[17px] text-center transition-all duration-200">
                {program.features[selected].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramFeatures;
