"use client";
import React, { useState } from "react";

import Header from "@/components/business/Header";
import WhyPartner from "@/components/business/WhyPartner";
import Partner from "@/components/business/Partner";


export default function Page({ pageData }: { pageData?: any }) {
  const [showSubmit, setShowSubmit] = useState(false);
  const bffBusiness = pageData?.bffBusiness;
    
  const partnerWithUs = pageData?.partnerWithUs;
  
  return (
    <>
      <div className="mt-20 md:mt-32 flex flex-col justify-center items-center w-full">
        <h1 className="font-semibold text-center text-[40px] lg:text-[72px] text-[#F2BD4D] mb-12">
          Introducing BFF Business
        </h1>
        <Header bffBusiness={bffBusiness} />
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
        <WhyPartner partnerWithUs={partnerWithUs} />
      </div>
      <div>
        <p className="text-white text-[40px] font-bold text-center">
          Interested in becoming a Bff Partner
        </p>
        <p className="text-white text-center">
          {" "}
          Please fill out the form if you are interested in partnering with us{" "}
        </p>
        <Partner />
      </div>
    </>
  );
}
