import React from "react";
import fitness from "@/assets/5f7aa530a00f940cb4a06efd_cultindoors-p-500.jpeg.png";
import Image from "next/image";
import Partner from "@/components/business/Partner";
import WhyPartner from "@/components/business/WhyPartner";

export default function Page() {
  return (
    <>
      <div className="mt-24 md:mt-32 flex flex-col justify-center items-center w-full">
        <h1 className="font-semibold text-center text-[40px] lg:text-[72px] text-[#FAB421] mb-4">
          BFF Franchise
        </h1>
        <p className="text-white w-[80%] xl:w-[53%] text-center ">
          Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Gorem ipsum dolor sit amet, consectetur adipiscing
          elit. Etiam eu turpis mol
        </p>

        <div className="flex flex-col md:flex-row items-center justify-around my-10 mx-10">
          <div className="w-full md:w-1/2">
            <Image className="max-w-full" src={fitness} alt="" />
          </div>

          <div className="text-white md:px-20 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold md:pr-10">
              Open your own <br />
              <span className="my-2 inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FCD858] to-[#EF5FA7]">
                BFF center
              </span>
            </h1>

            <p className="text-[20px]">
              Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla
            </p>

            <button className="text-black font-bold bg-white px-5 py-2 rounded-full my-10 hover:bg-indigo-500 hover:text-white">
              Partner With Us
            </button>
            <button className="text-white font-bold bg-indigo-600/90 px-5 py-2 rounded-full my-10 ml-5 hover:bg-white hover:text-indigo-500">
              Download Brochure
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8  lg:px-12 mb-20 mt-20">
        <h1 className="font-bold text-center text-[40px] lg:text-[72px] text-[#fff] mb-4">
          Why Partner With Us
        </h1>
        <p className="text-white text-center">
          Lorem ipsum is common placeholder text used to demonstrate the graphic
          elements of a document or visual presentation.
        </p>
        {/* Use map method tp render these cards */}
        <WhyPartner />
      </div>

      <div>
        <p className="text-white text-[40px] font-bold text-center">
          Interested in becoming a Bff Partner
        </p>
        <p className="text-white text-center">
          Please fill out the form if you are interested in partnering with us
        </p>
        <Partner />
      </div>
    </>
  );
}
