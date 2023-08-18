import ProgressBar from '@/components/dashboard/ProgressBar'
import React from 'react'

import {BiDotsHorizontalRounded} from 'react-icons/bi'
import profilePhoto from '@/assets/Photo.png'
import Image from 'next/image'
export default function page() {
   
  return (
    <div className='w-full h-screen py-[80px] px-[100px]  '>
        <div className='flex justify-center items-center'>
        <h1 className='text-[#F2BD4D] font-[600] text-[48px]'>Good Morning, Ayush</h1>
        </div>
       
        <div className='grid grid-cols-4 gap-10'>

            {/* =================STATS================= */}

            <div className=' bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-5 py-5 col-span-1'>
                <div className='text-white flex justify-between'>
                    <h1>Stats</h1>
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
            <div className=' bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl  py-5 px-10 col-span-2'>
                <h1 className='font-semibold text-[32px] text-center text-[#AFCCF8]'>Scheduled Session</h1>
                <div className='text-white flex justify-between rounded-lg px-4  py-4 border border-white my-4'>
                    <p> 10:00 AM</p>
                    <p>23rd April 2023</p>
                    <button className='bg-[#E59F0B] px-5 py-2 text-white rounded-lg'>Reschedule</button>
                </div>
                <div className='flex justify-center my-4'>
                    <button className='bg-[#514ED8] text-white px-5 py-3 rounded-lg'>Join Meeting</button>
                </div>
            </div>

            {/* =================PROFILE========================== */}
            <div className=' bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-5 py-5 col-span-1'>
                <div className='flex justify-between'>
                    <Image src = {profilePhoto} alt = "" />
                    <BiDotsHorizontalRounded color="white" />
                </div>
                <div>
                    <p className='text-white'>Ayush Sharma</p>
                    <p className='text-white'>Male 22</p>

                </div>
                <div>
                    <p className='text-white'>Standard Plan</p>
                    <p className='text-white'>Valid Untill : 23/06/2023</p>

                </div>
                <button className='bg-gradient-to-r from-[#EC77AB] to-[#7873F5] text-white px-4 py-3 rounded-lg border  border-[#E577B0] '>Upgrade to Premium</button>
              
            </div>


                {/* ===============Stats=================== */}
            <div className=' bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-5 py-5 col-span-1'>
                    <div className='text-white flex justify-between'>
                        <h1>Stats</h1>
                        <p>...</p>
                    </div>
                    <div className='flex justify-center items-center '>
                        <div className=" w-[65%] h-[200px] mb-5  rounded-full bg-gray-200 border-[10px] border-orange-500 bg-gradient-to-r from-[#4A2F70] to-[#344363] px-10 py-10">
                            
                            <div className='flex justify-center items-center w-full h-full rounded-full bg-orange-500 text-white '>47%</div>

                        </div>
                    
                   

                    </div>
                    
                    <div>
                        <div className='flex items-center'>
                            <div className="h-4 w-4 rounded-full bg-orange-500 mx-3 inline"></div>
                            <span className='text-white'>Restless</span>
                            <div className="h-4 w-4 rounded-full bg-white inline mx-3"></div>
                            <span className='text-white'>Restless</span>

                        </div>
                   
                        
                    </div>

                  



            </div>



                {/* =======================Achievements ==================== */}
            <div className=' bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-5 py-5 col-span-2'>

            </div>




            {/* ======================Contact Trainer============== */}
            <div className=' bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-3xl px-5 py-5 col-span-1'>

                <h1 className='text-white mb-4'>Contact Trainer</h1>

                <input type="text" className='mb-4  h-[100px] p-5 rounded-lg' placeholder='Type your query here' />
                <div>
                <button className='bg-[#514ED8] text-white px-5 py-3 rounded-lg'>Send query</button>

                </div>
                
            </div>
        </div>
    </div>
  )
}
