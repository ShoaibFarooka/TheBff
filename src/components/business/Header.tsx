"use client"
import React from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation,  } from 'swiper/modules'
import Image from 'next/image'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

// Swiper CSS
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'


// Assets
import slide1 from "@/assets/Slide Item — 1 (1).png"
import slide2 from "@/assets/Slide Item — 2 (1).png"
import slide3 from "@/assets/Slide Item — 3 (1).png"
import slide4 from "@/assets/Slide Item — 5 (1).png"
import slide5 from "@/assets/Slide Item — 2 (1).png"


const slides = [slide1, slide2, slide3, slide4, slide5]


const Header = ({bffBusiness} : {bffBusiness? :any}) => {

  const ref = React.useRef<SwiperRef>(null)

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
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
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
        className="swiper-container"
        ref={ref}
      >
        {bffBusiness?.map((slide?: any, index?: any) => (
          <SwiperSlide key={"slide-" + index} className="max-w-max">
            <Image
              src={slide}
              alt={"Slide " + index + 1}
              className="w-[200px] sm:w-[400px] md:w-[500px] lg:w-[700px] duration-300"
              width={500}
              height={400}
            />
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
}

export default Header
