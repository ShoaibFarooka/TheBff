"use client"



import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import div from '@/assets/div.png';
import div1 from '@/assets/div (1).png';
import {Link} from 'react-scroll'
import ScrollToBottom from 'react-scroll-to-bottom';


const content = [
  {
    title: 'Dance',
    content: `Looking for a fun workout alternative? Try our online dance classes! You can get fit, learn different styles, or prepare for your wedding dance. It's really cool! Don't just take our word for it - come join us and see for yourself just how fun our classes are!`,
    image: div1,
  }, {
    title: 'At-Gym',
    content: `Sweat now, shine later. We offer it all - Strength training, HIIT, Functional Fitness, Crossfit, Bodybuilding, and customized workout plans. These high-energy, high-intensity online fitness classes will take your usual gym routine to the next level! Get ready to crush your goals with our expert guidance.`,
    image: div,
  }, {
    title: 'At-Home',
    content: `Join our live interactive fitness workout classes to get fit without leaving your house. Choose from a variety of options including bodyweight training, resistance band training, HIIT, Pilates, and personalized workout plans tailored to your fitness goals.`,
    image: div1,
  }, 
  // {
  //   title: 'Yoga',
  //   content: `Want to reduce stress and stay mindful while you exercise? Try our online live yoga classes that focus on the full mind-body connection. Whether you're a seasoned yogi or a newbie to the mat, our interactive yoga classes offer something for everyone. Choose your type as Hatha, Vinyasa, Ashtanga, or Power Yoga or simply let us help you find it!`,
  //   image: div1,
  // }, {
  //   title: 'Meditation',
  //   content: `Need a break from the daily grind? Our guided meditation classes offer a sanctuary of serenity and relaxation. Increase your focus and improve your overall well-being. Choose your starting point - beginner, intermediate, or advanced and Let BFF’s experts guide you to a healthier, more purposeful future`,
  // }, {
  //   title: 'Nutrition',
  //   content: `Need some help with lifestyle changes? Want to say goodbye to fad diets and quick fixes?  We know it’s a battle! But your health is our priority. We're here to help you with weight management, PCOS (PCOD) relief plan, psoriasis relief, thyroid relief, general nutrition guidance, and more.`,
  // }, {
  //   title: 'In-Home',
  //   content: `We guarantee the fitness results you’re looking for. Our unique in-home workout system is perfect if you have limited time and space. But that's not all – we prioritize convenience and affordability too! Time to prioritize your health and well-being without worrying about the cost of care. Ditch excuses with BFF’s In-Home workout sessions. `,
  // }
]


export default function Classes({ classes }: { classes?: any }) {
  const [active, setActive] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement | null>(null); // Add type assertion
  
  return (
    <div>
      <div className="h-screen lg:flex justify-around px-[20px] lg:px-[100px] lg:pt-[50px]">

          <div className="w-full mb-6 my-auto lg:hidden mt-12">
            <div className="text-[#AFCCF8] text-center text-[24px] md:text-[40px] font-bold">
              Workout Program
            </div>
            <div className="text-center text-[24px] md:text-[40px] font-bold text-[#FED25B]">
              made for you
            </div>
          </div>

        <div className="lg:w-2/6 mb-8 lg:mb-0 px-3 lg:px-0 lg:h-full">
          <div className="image-container h-full flex justify-center items-center lg:flex-col gap-x-4" ref={imageContainerRef}>
            {content.map((c, index) => (
              <Image
                key={index}
                className={`w-[33%] lg:w-[60%] my-4 hover:shadow-white/60 hover:shadow-lg hover:scale-110 duration-300 rounded-md ${
                  index === active ? 'shadow-lg shadow-white/40' : ''
                }`}
                src={c.image!}
                alt={`Image ${index}`}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
        </div>

        <div className="lg:w-[45%] content h-full">
          {/* Display content based on activeImageIndex */}
          <div className="w-full mb-6 my-auto hidden lg:block">
            <div className="text-[#AFCCF8] text-center text-[24px] md:text-[40px] font-bold">
              Workout Program
            </div>
            <div className="text-center text-[24px] md:text-[40px] font-bold text-[#FED25B]">
              made for you
            </div>
          </div>
          
          <div className="rounded-3xl bg-gradient-to-r from-[#4A2F70] to-[#344363] px-[25px] py-5 lg:px-[55px] lg:py-10 md:mt-20">
            <h1 className="text-center font-bold text-[24px] md:text-[30px] text-[#FED25B]">
              {content[active].title}
            </h1>
            <p className="text-center text-white text-xs sm:text-lg">
              {/* Display content based on activeImageIndex */}
              {content[active].content}
            </p>
            <div className="flex justify-center mt-5">
              <button className="rounded-lg py-2 px-20 bg-[#aeb5e0]">Join Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
