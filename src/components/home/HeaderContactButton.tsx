"use client"

import React from 'react'
import Image from 'next/image'
import emoji from '@/assets/headset.png'


const HeaderContactButton = () => {
  return (
    <div className="center absolute bottom-4 right-6 md:bottom-16 md:right-16 lg:bottom-10 lg:right-10 z-[999] cursor-pointer w-20 h-20 md:w-32 md:h-32 lg:w-44 lg:h-44 bg-gray-300/30 rounded-full">
        <Image className='max-w-full mx-auto my-auto' src={emoji} alt="" onClick={() => document.getElementById('contactForm')?.scrollIntoView()} />
    </div>
  )
}

export default HeaderContactButton