"use client"
import React from 'react'
import Image, { StaticImageData } from "next/image";

import group1 from "@/assets/fruits.webp";
import group2 from "@/assets/Rectangle 1969.png";
import group3 from "@/assets/Rectangle 1970.png";
import group4 from "@/assets/Rectangle 1970 (1).png";
import rectangle from "@/assets/Rectangle 1976.png";


const content = [
    {
        image: group1,
        title: "Fruits",
        subTitle: "Fruits are necessary",
        description: "Fruits are the means by which angiosperms disseminate seeds. Edible fruits, in particular, have propagated with the movements of humans and animals in a symbiotic relationship as a means for seed dispersal and nutrition; in fact, humans and many animals have become dependent on fruits as a source of food.",
        image1: rectangle,
    }, {
        image: group2,
        title: "Yoga",
        subTitle: "Yoga is necessary",
        description: "Yoga is a group of physical, mental, and spiritual practices or disciplines which originated in ancient India. Yoga is one of the six Āstika (orthodox) schools of Hindu philosophical traditions. There is a broad variety of yoga schools, practices, and goals in Hinduism, Buddhism, and Jainism.",
        image1: rectangle,
    }, {
        image: group3,
        title: "Zumba",
        subTitle: "Zumba is necessary",
        description: "Zumba is an exercise fitness program created by Colombian dancer and choreographer Alberto \"Beto\" Pérez during the 1990s. Zumba is a trademark owned by Zumba Fitness, LLC. The Brazilian pop singer Claudia Leitte has become the international ambassador to Zumba Fitness.",
        image1: rectangle,
    }, {
        image: group4,
        title: "GYM",
        subTitle: "GYM is necessary",
        description: "A gymnasium, also known as a gym, is a covered location for athletics. The word is derived from the ancient Greek gymnasium. They are commonly found in athletic and fitness centers, and as activity and learning spaces in educational institutions. \"Gym\" is also slang for \"fitness center\", which is often an indoor facility.",
        image1: rectangle,
    }
]

const ImageWithTitle = ({
    image,
    title,
    active = false
  }: {
    image: StaticImageData | string,
    title: string,
    active?: boolean
    // i: number
  }) => {
    return (
      <div className="col-span-1 w-full h-[12rem] md:h-[18rem] lg:h-[22rem] cursor-pointer">
        <div className={"relative mx-auto w-[90%] h-full "}>
          <Image
            className={"w-[100%] h-full shadow-xl hover:shadow-purple-400 rounded-xl mx-auto " + (active && "shadow-purple-400/60")}
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


const StayHealthy = () => {

    const [active, setActive] = React.useState(0);


  return (
    <>
        {/* ============================== Stay Healthy ======================= */}
      <div className="my-20">
        <div>
          <p className="text-center font-semibold text-[40px] lg:text-[72px] text-[#F2BD4D]">
            How can you stay healthy?
          </p>

          <p className="text-center text-white px-5">
            Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 mt-10 mb-5 mx-auto px-3 md:px-5 lg:px-14">
            <div onClick={() => setActive(0)}>
                <ImageWithTitle image={group1} title="Fruits" active={active == 0} />
            </div>
            <div onClick={() => setActive(1)}>
                <ImageWithTitle image={group2} title="Yoga" active={active == 1} />
            </div>
            <div onClick={() => setActive(2)}>
                <ImageWithTitle image={group3} title="Zumba" active={active == 2} />
            </div>
            <div onClick={() => setActive(3)}>
                <ImageWithTitle image={group4} title="GYM" active={active == 3} />
            </div>
        </div>
      </div>

      <div className="mb-20 mt-20 px-5">
        <div className="mb-7 md:mb-10">
          <h1 className="text-center font-semibold text-[40px] lg:text-[72px] text-[#F2BD4D]">
            {content[active].title}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-around lg:px-[80px] gap-y-10">
          <div className="w-full md:w-1/2">
            <Image
              src={content[active].image1 ?? content[active].image}
              alt=""
              className="max-w-full md:max-w-[75%] transition-all duration-200"
            />
          </div>

          <div className="w-full md:w-1/2 text-white px-5 lg:px-[50px]">
            <p className="text-center font-semibold text-[40px] mb-7 md:mb-10 text-[#AFCCF8] transition-all duration-200">
                {content[active].subTitle}
            </p>
            <p className="text-[17px] text-center transition-all duration-200">
                {content[active].description}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default StayHealthy