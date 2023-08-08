import React from 'react'
import emoji from '@/assets/Frame 407.png'
import Image from 'next/image'
export default function Home() {
  return (

  <div className='h-screen '>
    <div className="absolute top-0 left-0 w-full h-screen bg-[#00000090]"></div>
    <video controls autoPlay loop  >
        <source src="/fitness.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className=' flex absolute justify-center items-center  bottom-[200px] w-full  h-full'>
            <div className='w-full '>
               <div className='text-white text-center text-[24px] md:text-[40px] font-bold mb-2'>Bored with your gym routine,</div>
        
               <div className='text-center text-[24px] md:text-[40px] font-bold text-[#FED25B]'>try working out with BFF</div>
          </div>

      </div>
       <Image className=' absolute bottom-20 right-20' src={emoji} alt="" />
  
  
      
  </div>
  )
}