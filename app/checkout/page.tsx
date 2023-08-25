import React from 'react'
import Image from 'next/image'
import back from '@/assets/Click Area.png'
import frame from '@/assets/Frame 3927.png'
import frame1 from "@/assets/Rectangle 2812.png"
import frame2 from "@/assets/Rectangle 2812 (1).png"
import discount from '@/assets/Discount Badge.png'
import ellipse from '@/assets/Ellipse 203.png'
export default function page() {
  return (
    <div className='mt-24 md:mt-30'>
        <div className='relative'>
            <button className='absolute top-5 left-3 md:left-10 bg-gray-800 rounded-full p-3'>
            <Image className='w-1/2 md:w-full'  src={back} alt =" "/>

            </button>
           
            <h1 className="font-semibold text-center text-[40px] lg:text-[72px] text-[#F2BD4D] mb-4">Checkout</h1>
        </div>
        <div>
            <div className='flex flex-col md:flex-row justify-around px-5'>
                <div className='w-full md:w-[40%]'>
                    <Image className='w-full' src={frame} alt=""/>
                    <div>
                        <h1 className='text-white text-[32px] font-[600] mt-5 mb-2'>Suggested Plans</h1>
                        <div className='flex flex-row justify-between px-3 py-4 rounded-xl items-center  bg-gradient-to-r from-[#4A2F70] to-[#344363]'>
                            <Image src = {frame1} alt =" "/>
                            <p className='text-[10px] md:text-base text-white'>1 Moth Premium - Dance</p>
                            <button className='text-white bg-[#6557FF] px-5 md:px-10 py-2 rounded-xl'>View</button>

                        </div>
                        <div className='flex justify-between px-3  py-4 rounded-xl items-center  bg-gradient-to-r from-[#4A2F70] to-[#344363]  mt-5'>
                            <Image src = {frame2} alt =" "/>
                            <p className='text-[10px] md:text-base text-white'>1 Moth Premium - Dance</p>
                            <button className='text-white bg-[#6557FF] px-5 md:px-10 py-2 rounded-xl'>View</button>

                        </div>
                    </div>

                </div>
                


                <div className='w-full md:w-[40%]'>
                    <div>
                        <h1 className='text-white text-[32px]'>1 Month Premium - Weight Management</h1>
                        <div className='flex items-center my-3'>
                        <h2 className='text-white text-[32px] font-bold'>₹ 3499</h2> 
                        <h2 className='ml-5 text-[#ABABAB] text-[32px] font-bold line-through'>₹ 6499</h2>
                        <button className="text-white bg-[#6557FF] px-1 rounded-md ml-5">
                        -30%
                      </button>
                        </div>
                        
                        <p className='text-white'>
                        Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis mol

                        </p>
                        <button className= 'text-white bg-[#6557FF] px-10 py-2 rounded-xl my-5'>Get Pack</button>
                    </div>
                    <div>
                        <h1 className='text-white text-[32px] my-2 font-[600]'>Offers</h1>
                        <div className='rounded-xl  flex justify-around items-center py-2 px-2 bg-gradient-to-r from-[#4A2F70] to-[#344363] '>
                            <Image src = {discount} alt = "" />
                            <p className='text-white'>Only Today  | Additional  500 off applied.</p>
                            <p className='text-[#F2BD4D]'>T&C</p>
                        </div>
                        <div className='rounded-xl  flex justify-around items-center py-2 px-2 bg-gradient-to-r from-[#4A2F70] to-[#344363] mt-5'>
                            <Image src = {discount} alt = "" />
                            <p className='text-white'>Only Today  | Additional  ₹500 off applied.</p>
                            <p className='text-[#F2BD4D]'>T&C</p>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-white text-[32px] mt-5'>How it works</h1>
                        <div className='flex items-center mt-5'>
                            <Image src = {ellipse} alt = ""/>
                            <p className='text-white pl-5'>
                            Live workouts: Choose from the wide variety of online workouts and join in from anywhere

                            </p>
                        </div>
                        <div className='flex items-center mt-5'>
                            <Image src = {ellipse} alt = ""/>
                            <p className='text-white pl-5'>
                            Live workouts: Choose from the wide variety of online workouts and join in from anywhere

                            </p>
                        </div>
                        <div className='flex items-center mt-5'>
                            <Image src = {ellipse} alt = ""/>
                            <p className='text-white pl-5'>
                            Live workouts: Choose from the wide variety of online workouts and join in from anywhere

                            </p>
                        </div>
                    </div>
                </div>
                
            </div>

        </div>
    </div>
  )
}
