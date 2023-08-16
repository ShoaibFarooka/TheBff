"use client";

import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import {GrFormClose} from "react-icons/gr"
import { RxDotFilled } from "react-icons/rx";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import Image, { StaticImageData } from "next/image";
import StayHealthy from "@/components/programs/StayHealthy";
import Header from "@/components/programs/Header";

import slide1 from "@/assets/Slide Item — 1.png";
import slide2 from "@/assets/Slide Item — 2.png";
import slide3 from "@/assets/Slide Item — 3.png";
import slide4 from "@/assets/Slide Item — 4.png";
import slide5 from "@/assets/Slide Item — 5.png";

import group1 from "@/assets/fruits.webp";
import group2 from "@/assets/Rectangle 1969.png";
import group3 from "@/assets/Rectangle 1970.png";
import group4 from "@/assets/Rectangle 1970 (1).png";

import rectangle from "@/assets/Rectangle 1976.png";
import ContactForm from "@/components/ContactForm";

import image1 from "@/assets/Cardio.png";
import image2 from "@/assets/Strength.png";
import image3 from "@/assets/Yoga.png";
import image4 from "@/assets/No equipment.png";
import image5 from "@/assets/Toning.png";
import image6 from "@/assets/Walking.png";

const ImageWithTitle = ({
  image,
  title,
}: {
  image: StaticImageData | string;
  title: string;
}) => {
  return (
    <div className="col-span-1 w-full h-[12rem] md:h-[18rem] lg:h-[22rem]">
      <div className="relative mx-auto hover:shadow shadow-purple-300 w-[90%] h-full">
        <Image
          className="w-[100%] h-full hover:shadow shadow-purple-400 rounded-xl mx-auto"
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

export default function Page() {

  const [isOpen, setIsOpen] = useState(true);

  // const openPopup = () => {
  //   setIsOpen(true);
  // };

  const closePopup = () => {
    setIsOpen(false);
  };
  const [stayHealthy, setStayHealthy] = useState(0);

  const slides = [slide1, slide2, slide3, slide4, slide5];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: React.SetStateAction<number>) => {
    setCurrentIndex(slideIndex);
  };

  
  return (
    <>
     
      <div className="mt-20 md:mt-32 flex flex-col justify-center items-center w-full relative group px-5 md:px-14">
        <h1 className="font-semibold text-center text-[40px] lg:text-[72px] text-[#F2BD4D] mb-12">
          {" "}
          Weight Management{" "}
        </h1>

        <Header />

        {/* <div className="">
          <AiOutlineArrowLeft
            onClick={prevSlide}
            size={35}
            className="cursor-pointer hidden md:group-hover:block text-white absolute top-[50%] left-5 md:left-20 -translate-x-0 translate-y-[-50%]"
          />
          <Image
            src={slides[currentIndex]}
            alt=""
            className="w-[700px] duration-300"
          />
          <AiOutlineArrowRight
            onClick={nextSlide}
            size={35}
            className="cursor-pointer hidden md:group-hover:block text-white absolute top-[50%] right-5 md:right-20 -translate-x-0 translate-y-[-50%]"
          />
        </div>

        <div className="flex top-4 justify-center items-center py-2">
          <AiOutlineArrowLeft onClick={prevSlide} size={25} className=" text-white " />
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer text-[#fff]"
            >
              <RxDotFilled className="text-[#ggg]" />
            </div>
          ))}
          <AiOutlineArrowRight onClick={prevSlide} size={25} className=" text-white " />
        </div> */}
      </div>


      <StayHealthy />

      {/* ============================== Unlimited Variety ======================= */}
      <div className="px-4 md:px-8 lg:px-12 mb-20 mt-20">
        <div className="rounded-3xl bg-gradient-to-r from-[#4A2F70] to-[#344363] px-3 md:px-10 py-5 md:py-10">
          <div className="text-white ">
            <p className="my-5 text-center font-semibold text-[30px] lg:text-[64px]">
              Unlimited variety
            </p>
            <p className="my-5 text-center">Unlimited variety</p>
            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-3 md:gap-10">
                <Image src={image1} alt="" />
                <Image src={image2} alt="" />
                <Image src={image3} alt="" />
                <Image src={image4} alt="" />
                <Image src={image5} alt="" />
                <Image src={image6} alt="" />
              </div>
            </div>
            <div className="flex justify-center my-10">
              {/* <button className="rounded-xl px-10 py-2.5 font-semibold bg-blue-500 border-solid bg-opacity-100 border-gradient">
                Start training now
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* ============================== Pricing ======================= */}
      <div className="my-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-center font-semibold text-[40px] lg:text-[72px] text-[#F2BD4D]">
            Choose Your Plan
          </h1>
          <p className="text-blue-200 text-center"> best prices offered , choose the plan that suits you </p>

          <div className="w-full mt-10">

            <div className="w-full grid grid-cols-3 text-white/90 md:text-xl px-4 md:px-0">
              <div className="col-span-1 mb-10"> </div>
              <div className="col-span-1 mb-10 text-center"> 
                <h3 className="text-white text-2xl md:text-3xl font-semibold"> Standard </h3>
              </div>
              <div className="col-span-1 mb-10 text-center">
                <h3 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#F2BD4D] to-red-600"> Premium </h3>
              </div>

              <div className="col-span-1 py-3">
                <h3 className="font-bold"> Live Interaction Classes </h3>
              </div>
              <div className="col-span-1 py-3 border border-gray-400/40">
                <IoMdCheckmarkCircleOutline size={23} className="text-3xl text-blue-400 mx-auto" />
                <h3 className="text-center"> Yes </h3>
              </div>
              <div className="col-span-1 py-3 border border-gray-400/40">
                <IoMdCheckmarkCircleOutline size={23} className="text-3xl text-blue-400 mx-auto" />
                <h3 className="text-center"> Yes </h3>
              </div>

              <div className="col-span-1 py-3">
                <h3 className="font-bold"> Frequency </h3>
              </div>
              <div className="col-span-1 py-3 border border-gray-400/40">
                <IoMdCheckmarkCircleOutline size={23} className="text-3xl text-blue-400 mx-auto" />
                <h3 className="text-center"> 18 Sessions </h3>
              </div>
              <div className="col-span-1 py-3 border border-gray-400/40">
                <IoMdCheckmarkCircleOutline size={23} className="text-3xl text-blue-400 mx-auto" />
                <h3 className="text-center"> Unlimited </h3>
              </div>

              <div className="col-span-1 py-3">
                <h3 className="font-bold"> Diet Assitance </h3>
              </div>
              <div className="col-span-1 py-3 border border-gray-400/40">
                <RxCrossCircled size={23} className="text-3xl text-gray-500 mx-auto" />
                <h3 className="text-center"> No </h3>
              </div>
              <div className="col-span-1 py-3 border border-gray-400/40">
                <IoMdCheckmarkCircleOutline size={23} className="text-3xl text-blue-400 mx-auto" />
                <h3 className="text-center"> Yes </h3>
              </div>

              <div className="col-span-1 py-3">
                <h3 className="font-bold"> Pause Membership </h3>
              </div>
              <div className="col-span-1 py-3 border border-gray-400/40">
                <RxCrossCircled size={23} className="text-3xl text-gray-500 mx-auto" />
                <h3 className="text-center"> No </h3>
              </div>
              <div className="col-span-1 py-3 border border-gray-400/40">
                <IoMdCheckmarkCircleOutline size={23} className="text-3xl text-blue-400 mx-auto" />
                <h3 className="text-center"> Yes </h3>
              </div>

              <div className="col-span-1 py-3">
                <h3 className="font-bold"> No Cost EMI </h3>
              </div>
              <div className="col-span-1 py-3 border border-gray-400/40">
                <RxCrossCircled size={23} className="text-3xl text-gray-500 mx-auto" />
                <h3 className="text-center"> No </h3>
              </div>
              <div className="col-span-1 py-3 border border-gray-400/40">
                <IoMdCheckmarkCircleOutline size={23} className="text-3xl text-blue-400 mx-auto" />
                <h3 className="text-center"> Yes </h3>
              </div>

              <div className="col-span-1 py-3">
              </div>
              <div className="col-span-1 py-3 border border-gray-400/40 center flex-col">
                <p className="text-base md:text-xl text-center mb-2.5"> Starting at Rs. 1999/- month </p>
                {/* <button className="shadow-xl shadow-red-800/10 mx-auto rounded px-2 py-1.5 border-none outline-none bg-white text-red-500 font-semibold focus:border"> View Plans </button> */}
              </div>
              <div className="col-span-1 py-3 border border-gray-400/40 center flex-col">
                <p className="text-base md:text-xl text-center mb-2.5"> Starting at Rs. 3499/- month </p>
                {/* <button className="shadow-xl shadow-red-800/10 mx-auto rounded px-2 py-1.5 border-none outline-none bg-white text-red-500 font-semibold focus:border"> View Plans </button> */}
              </div>



            </div>

          </div>

        </div>
      </div>

      <ContactForm />
    </>
  );
}
