import React from "react";
import Image, { StaticImageData } from "next/image";
import Head from "next/head";
import ContactForm from "@/components/ContactForm";
import Coaches from "@/components/home/Coaches";

// Import Assets
import Component22 from "@/assets/Component 22.png";
import Component23 from "@/assets/Component 23.png";
import Component34 from "@/assets/Component 34.png";
import Component35 from "@/assets/Component 35.png";
import Component36 from "@/assets/Component 36.png";
import Component38 from "@/assets/Component 38.png";
import Component42 from "@/assets/Component 42.png";
import Component43 from "@/assets/Component 43.png";
import Component44 from "@/assets/Component 44.png";

import div from "@/assets/div.png";
import div1 from "@/assets/div (1).png";


export default function Home() {
  return (
    <>
      <Head>
        <link rel="preload" href="/fitness.mp4" as="video" />
      </Head>

      <div className="relative min-h-[90vh] bg-opacity-20">
        {/* <div className="w-full bg-[#00000090]"></div> */}

        <video
          controls={false}
          autoPlay
          loop
          muted
          className="w-full h-screen object-cover aboslute top-0 left-0"
        >
          <source src="/fitness.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 flex justify-center items-center w-full h-full z-50 bg-black bg-opacity-50">
          <div className="w-full">
            <div className="text-white text-center text-[24px] md:text-[40px] font-bold mb-2">
              Bored with your gym routine,
            </div>

            <div className="text-center text-[24px] md:text-[40px] font-bold text-[#FED25B]">
              try working out with BFF!
            </div>
          </div>

        </div>
      </div>

      {/* ===========================Types of Programs===================== */}

      <div className="h-screen lg:flex justify-around px-[20px] lg:px-[100px] lg:pt-[50px]">
        <div className="lg:w-2/6 h-1/3 lg:h-full">
          <div className="h-full lg:h-[75%] overflow-y-scroll no-scrollbar mt-[100px]  md:pl-[100px] ">
            <Image
              className=" w-full md:w-[90%]  my-4 hover:shadow-white hover:shadow-lg hover:scale-110 duration-300"
              src={div}
              alt="Weight Management"
            />
            <Image
              className=" w-full md:w-[90%]  my-4 hover:shadow-white hover:shadow-lg hover:scale-110 duration-300"
              src={div1}
              alt="Weight Management"
            />
            <Image
              className=" w-full md:w-[90%]  my-4 hover:shadow-white hover:shadow-lg hover:scale-110 duration-300"
              src={div}
              alt="Weight Management"
            />
            <Image
              className=" w-full md:w-[90%]  my-4 hover:shadow-white hover:shadow-lg hover:scale-110 duration-300"
              src={div1}
              alt="Weight Management"
            />
            <Image
              className=" w-full md:w-[90%]  my-4 hover:shadow-white hover:shadow-lg hover:scale-110 duration-300"
              src={div}
              alt="Weight Management"
            />
          </div>
        </div>

        <div className="lg:w-[45%]">
          <div className="w-full mb-6">
            <div className="text-[#AFCCF8] text-center text-[24px] md:text-[40px] font-bold">
              Workout Program
            </div>

            <div className="text-center text-[24px] md:text-[40px] font-bold text-[#FED25B]">
              made for you
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-r from-[#4A2F70] to-[#344363] px-[25px] py-5  lg:px-[55px] lg:py-10">
            <h1 className="text-center font-bold text-[24px] md:text-[30px] text-[#FED25B]">
              Weight Management
            </h1>
            <p className="text-center text-white text-xs sm:text-lg">
              Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos.
            </p>
            <div className="flex justify-center mt-5">
              <button className=" rounded-lg py-2  px-20 bg-[#aeb5e0]">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-8">
        
      </div> */}

      {/* ===================== {Gallery} ===================== */}
      <div className="relative py-5 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:px-32 lg:gap-x-7 mx-auto">
          <div className="col-span-1 flex flex-col gap-y-7">
            <div className="w-full">
              <Image src={Component22} alt="" className="w-10/12 rounded-md mx-auto" />
            </div>
            <div className="w-full">
              <Image src={Component34} alt="" className="w-10/12 rounded-md mx-auto" />
            </div>
            <div className="w-full">
              <Image src={Component42} alt="" className="w-10/12 rounded-md mx-auto" />
            </div>
          </div>

          <div className="hidden  md:col-span-1 md:flex flex-col gap-y-7 md:mt-10">
            <div className="w-full">
              <Image src={Component23} alt="" className="w-10/12 rounded-md mx-auto" />
            </div>
            <div className="w-full">
              <Image src={Component35} alt="" className="w-10/12 rounded-md mx-auto" />
            </div>
            <div className="w-full">
              <Image src={Component43} alt="" className="w-10/12 rounded-md mx-auto" />
            </div>
          </div>

          <div className="hidden col-span-1 md:flex flex-col gap-y-7">
            <div className="w-full">
              <Image src={Component38} alt="" className="w-10/12 rounded-md mx-auto" />
            </div>
            <div className="w-full">
              <Image src={Component36} alt="" className="w-10/12 rounded-md mx-auto" />
            </div>
            <div className="w-full">
              <Image src={Component44} alt="" className="w-10/12 rounded-md mx-auto" />
            </div>
          </div>
        </div>

        {/* ===================== {Overlay} ===================== */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 center z-50">
          <div className="w-full md:w-1/2  mx-auto">
            <h2 className="text-4xl font-bold text-white text-center backdrop-blur bg-black bg-opacity-50">
              {" "}
              Achieve your fitness goals without stepping out of your comfort
              zone{" "}
            </h2>
          </div>
        </div>
      </div>

      {/* ============================== YOGA COACHES ======================= */}
      <Coaches />

      {/* ===================== {Contact Form} ===================== */}

      <ContactForm />
    </>
  );
}
