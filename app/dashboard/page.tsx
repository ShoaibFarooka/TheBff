"use client"
import ProgressBar from '@/components/dashboard/ProgressBar'
import React, { useState } from 'react'

import {BiDotsHorizontalRounded} from 'react-icons/bi'
import profilePhoto from '@/assets/Photo.png'
import Image from 'next/image'
import person from '@/assets/Person.png'
import text from '@/assets/Text.png'
import squaare from '@/assets/Square.png'
import close from "@/assets/Close.png"
import gift from '@/assets/Gift.png'

import Achihievement from "@/assets/Artwork.png"
import tick from "@/assets/Not Started.png"
import { set } from 'mongoose'
import { fa } from '@faker-js/faker'
 


export default function Page() {
    const [side , setSide] = useState(false)
    const handleSide = () => {
        setSide(!side)
    }
   
  return (
    <>{side && (
        <aside
        className={` bg-gradient-to-r from-[#001B61] to-[#00154A]  z-[10000] rounded-3xl w-64 h-screen fixed top-0 right-0 transition-transform transform text-white flex flex-col items-center justify-around 
        }`}
       
      >
       <div className='flex items-center mt-12 mb-5 justify-between '>
           <Image src = {profilePhoto} className='w-12' alt = " " />
           <div className='ml-5'>
               <h1>Ayush Sharma</h1>
               <p>Male 22</p>
           </div>

       </div>
       <div>
           <div className='flex items-center mb-2'>
               <Image src = {person} alt = "" /> 
               <p className='ml-5'>My Profile</p>
           </div>
           <div className='flex items-center  mb-2'>
               <Image src = {text} alt = "" /> 
               <p className='ml-5'>Health Reports</p>
           </div>

           <div className='flex items-center  mb-2'>
               <Image src = {squaare} alt = "" /> 
               <p className='ml-5'>Queries</p>
           </div >
           <div className='flex items-center  mb-2'>
               <Image src = {close} alt = "" /> 
               <p className='ml-5'>Blogs</p>
           </div>
           <div className='flex items-center  mb-2'>
               <Image src = {gift} alt = "" /> 
               <p className='ml-5'>Rewards</p>
           </div>
       </div>
       <div>
           <button className='px-10 py-1 bg-[#C56936] '>Logout</button>
       </div>
      </aside>

)}

 
<div onClick={ side ? handleSide : undefined }  className={` w-full h-full py-[60px] px-[40px]  lg:py-[80px] lg:px-[100px]  ${
          side && 'filter blur-md  inset-0  opacity-30'
        }`}   > 
          
                <button className="w-[60px]" onClick={handleSide}>
        <Image src={profilePhoto} alt="" />
        </button>
        <div className='flex justify-center items-center'>
        <h1 className='text-[#F2BD4D] font-[600] text-[32px] lg:text-[48px] mb-10'>Good Morning, Ayush</h1>
        </div>
       
        <div className='grid grid-cols-1  lg:grid-cols-4 gap-10'>

            {/* =================STATS================= */}

            <div className=' bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-5 py-5 lg:col-span-1'>
                <div className='text-white flex justify-between'>
                    <h1 className='font-semibold text-[32px]'>Stats</h1>
                    <p>...</p>
                </div>
                <p className='text-[#fff]'>Every large design company whether it’s a multi-national branding.</p>
                <div>
                    <div className='text-white flex justify-between'>
                        <h1>Metric 1</h1>
                        <p>65,376</p>
                    </div>
                    <div className="mb-5 h-2 rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-orange-500 w-[50%]"></div>
                    </div>
                    
                </div>
                <div>
                    <div className='text-white flex justify-between'>
                        <h1>Metric 2</h1>
                        <p>12,109</p>
                    </div>
                    <div className="mb-5 h-2 rounded-full bg-gray-200">
                 <div className="h-2 rounded-full bg-[#4339F2] w-[50%]"></div>
                </div>

                </div>
                <div>
                    <div className='text-white flex justify-between'>
                        <h1>Metric 3</h1>
                        <p>132,645</p>
                    </div>
                    <div className="mb-5 h-2 rounded-full bg-gray-200">
                 <div className="h-2 rounded-full bg-[#02A0FC] w-[50%]"></div>
                </div>

                </div>
                <div>
                    <div className='text-white flex justify-between'>
                        <h1>Metric 4</h1>
                        <p>100,426</p>
                    </div>
                    <div className="mb-5 h-2 rounded-full bg-gray-200">
                 <div className="h-2 rounded-full bg-[#FF3A29] w-[50%]"></div>
                </div>

                </div>

            </div>

            {/* ===================Scheduled Session================== */}
            <div  className=' bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl  py-5 px-3 lg:px-10 lg:col-span-2'>
                <h1 className='font-semibold text-[32px] text-center text-[#AFCCF8] mb-10'>Scheduled Session</h1>
                <div className='flex justify-center'>
                <div className='text-white flex justify-between rounded-lg px-4  py-4 border border-white my-4 w-full lg:w-4/5 items-center'>
                    <p className='text-xs lg:text-base'> 10:00 AM</p>
                    <p className='text-xs lg:text-base'>23rd April 2023</p>
                    <button className='bg-[#E59F0B] px-5 py-2 text-white rounded-lg'>Reschedule</button>
                </div>

                </div>
                
                <div className='flex justify-center my-5'>
                    <button className='bg-[#514ED8] text-white px-[70px] py-3 rounded-lg'>Join Meeting</button>
                </div>

            </div>

            {/* =================PROFILE========================== */}
            <div className=' bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-5 py-5 lg:col-span-1'>
                <div className='flex justify-between'>
                    <Image src = {profilePhoto} alt = "" />
                    <BiDotsHorizontalRounded color="white" />
                </div>
                <div className='my-5'>
                    <p className='text-white'>Ayush Sharma</p>
                    <p className='text-gray-400'>Male 22</p>

                </div>
                <div className='my-5'>
                    <p className='text-white'>Standard Plan</p>
                    <p className='text-gray-400'>Valid Untill : 23/06/2023</p>

                </div>
                <button className='bg-gradient-to-r from-[#EC77AB] to-[#7873F5] text-white px-4 py-3 rounded-lg border  border-[#E577B0] '>Upgrade to Premium</button>
              
            </div>


                {/* ===============Stats=================== */}
            <div className=' bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-5 py-5 lg:col-span-1'>
                    <div className='text-white flex justify-between'>
                        <h1>Stats</h1>
                        <p>...</p>
                    </div>
                    <div className='flex justify-center items-center '>
                        <div className="w-full lg:w-[65%] h-[200px] mb-5  rounded-full bg-gray-200 border-[10px] border-orange-500 bg-gradient-to-r from-[#4A2F70] to-[#344363]  mx-[10%]  md:mx-[35%] xl:mx-[25%] px-10 py-10">
                            
                            <div className='flex justify-center items-center w-full h-full rounded-full bg-orange-500 text-white '>47%</div>

                        </div>
                    
                   

                    </div>
                    
                    <div>
                        <div className='flex items-center'>
                            <div className="h-4 w-4 rounded-full bg-orange-500 mx-3 inline"></div>
                            <span className='text-white'>Restless</span>
                            <div className="h-4 w-4 rounded-full bg-white inline mx-3"></div>
                            <span className='text-white'>Awake</span>

                        </div>
                   
                        
                    </div>

                  



            </div>



                {/* =======================Achievements ==================== */}
            <div className=' bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-10 py-5 lg:col-span-2'>
                <h1 className='text-white text-[24px]'>Achievements & Rewards</h1>
                
                <div className='flex flex-col md:flex-row md:justify-around  text-white '>
                    <div className='rounded-2xl shadow-[#9747FF] shadow-2xl px-4 py-4 w-full lg:w-[167px]'>
                        <Image src={Achihievement} alt='' className='mb-5'/>
                        <p className='mb-5'>A Topic Name That Is Two Lines</p>
                        <div className='flex justify-between items-center'>
                            <p className='text-[12px]'>Recall 100%</p>
                            <Image src={tick} alt="" />
                        </div>
                    </div>
                    <div className='rounded-3xl shadow-[#9747FF] shadow-2xl px-4 py-4 my-5 lg:my-0  w-full lg:w-[167px]'>
                        <Image src={Achihievement} alt='' className='mb-5'/>
                        <p className='mb-5'>A Topic Name That Is Two Lines</p>
                        <div className='flex justify-between items-center'>
                            <p className='text-[12px]'>Recall 100%</p>
                            <Image src={tick} alt="" />
                        </div>
                    </div>
                    <div className='rounded-3xl shadow-[#9747FF] shadow-2xl px-4 py-4 w-full lg:w-[167px]'>
                        <Image src={Achihievement} alt='' className='mb-5'/>
                        <p className='mb-5'>A Topic Name That Is Two Lines</p>
                        <div className='flex justify-between items-center'>
                            <p className='text-[12px]'>Recall 100%</p>
                            <Image src={tick} alt="" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mt-5'>
                    <div className=" mb-5 h-2 rounded-full bg-gray-200 w-1/2">
                            <div className="h-2 rounded-full bg-orange-500 w-[50%]"></div>
                    </div>

                </div>
               
            </div>




            {/* ======================Contact Trainer============== */}
            <div className=' bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-10 py-5 lg:col-span-1'>

                <h1 className='text-white text-[24px] mb-4'>Contact Trainer</h1>

                <input type="text" className='mb-10  h-[100px] p-5 rounded-lg w-full ' placeholder='Type your query here' />
                <div className='text-center'>
                <button className='bg-[#514ED8] text-white px-[40px] xl:px-[80px] py-3 rounded-lg'>Send query</button>

                </div>
                
            </div>
        </div>
    </div>
    </>
   
  )
}
