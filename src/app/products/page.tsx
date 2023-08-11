"use client"

import React, {useState } from 'react'
import  {AiOutlineArrowLeft , AiOutlineArrowRight} from "react-icons/ai"
import { RxDotFilled } from 'react-icons/rx';
import Image from 'next/image'
import slide1 from '@/assets/Slide Item — 1.png'
import slide2 from '@/assets/Slide Item — 2.png'
import slide3 from '@/assets/Slide Item — 3.png'
import slide4 from '@/assets/Slide Item — 4.png'
import slide5 from '@/assets/Slide Item — 5.png'




import group1 from "@/assets/Group 4.png"
import group2 from "@/assets/Group 5.png"
import group3 from "@/assets/Group 6.png"
import group4 from "@/assets/Group 7.png"


import rectangle from "@/assets/Rectangle 1976.png"
import ContactForm from '@/components/ContactForm';


import image1 from "@/assets/Cardio.png"
import image2 from "@/assets/Strength.png"
import image3 from "@/assets/Yoga.png"
import image4 from "@/assets/No equipment.png"
import image5 from "@/assets/Toning.png"
import image6 from "@/assets/Walking.png"


export default function Page() {
    const [stayHealthy , setStayHealthy] = useState(0)

    const slides = [
        slide1,
        slide2,
        slide3,
        slide4,
        slide5,

      ];
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
        <div className='h-screen flex flex-col justify-center items-center w-full relative group'>
            
            <h1 className='font-semibold text-[72px] text-[#F2BD4D]'>Weight Management</h1>
            <div className=' '>
                <AiOutlineArrowLeft onClick={prevSlide} className= " hidden group-hover:block text-white absolute top-[50%] left-5 -translate-x-0 translate-y-[-50%]"/>
                {/* <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
      ></div> */}
      <Image src={slides[currentIndex]} alt ="" className='w-[700px] duration-300'/>
                <AiOutlineArrowRight onClick={nextSlide} className=" hidden group-hover:block text-white absolute top-[50%] right-5 -translate-x-0 translate-y-[-50%]"/>
            </div>
            <div className='flex top-4 justify-center items-center py-2'>
            <AiOutlineArrowLeft onClick={prevSlide} className= " text-white "/>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer text-[#fff]'
          >
            <RxDotFilled className="text-[#ggg]"/>
           
          </div>
        ))}
         <AiOutlineArrowRight onClick={prevSlide} className= " text-white "/>
      </div>
           
        </div>





        <div>
            <div>
                <p className='text-center font-semibold text-[72px] text-[#F2BD4D]'>How can you stay healthy?</p>
                <p className='text-center text-white'>Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.</p>
            </div>
            <div className='flex justify-center items-center'>
                <Image  className='mr-10' src={group1} alt = ""/>
                <Image className='mr-10' src={group2} alt = ""/>
                <Image className='mr-10' src={group3} alt = ""/>
                <Image className='mr-10' src={group4} alt = ""/>
            </div>
            <div className=' flex justify-center'>
            <RxDotFilled className="text-[#fff] " onClick={() => setStayHealthy(1)}/>
            <RxDotFilled className="text-[#fff] "onClick={() => setStayHealthy(2)}/>
            <RxDotFilled className="text-[#fff]" onClick={() => setStayHealthy(3)}/>
            <RxDotFilled className="text-[#fff]" onClick={() => setStayHealthy(4)}/>

            </div>
           
        </div>





        <div className='mb-10'>
            <div className='mb-10'>
                <h1 className='text-center  font-semibold text-[72px] text-[#F2BD4D]'>Heading 1</h1>
            </div>
            <div className='flex justify-around px-[80px]'>
                <Image src={rectangle} alt=""/>
                <div className=' w-1/3 text-white  px-[50px]'>
                    <p className='text-center font-semibold text-[40px] mb-10 text-[#AFCCF8]'>SubHeading 1</p>
                    <p className='text-center'>Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. </p>

                </div>
            </div>
        </div>





        <div className='rounded-3xl bg-gradient-to-r from-[#4A2F70] to-[#344363] px-10 py-10'>
          <div className='text-white '>
            <p className='my-5 text-center font-semibold text-[64px]'>Unlimited variety</p>
            <p className='my-5 text-center'>Unlimited variety</p>
            <div className='flex justify-center'>
            <div className='grid grid-cols-3 gap-10'>
            <Image src={image1} alt=""/>
            <Image src={image2} alt=""/>
            <Image src={image3} alt=""/>
            <Image src={image4} alt=""/>
            <Image src={image5} alt=""/>
            <Image src={image6} alt=""/>

            </div>
            
              
            </div>
            <div className='flex justify-center my-10'>
            <button className="rounded-xl px-10 py-1 bg-blue-500 border-solid bg-opacity-100 border-gradient">Start training now</button>

            </div>
           
          </div>
        </div>
        <ContactForm />
    </>
  )
}