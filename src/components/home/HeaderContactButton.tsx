"use client"

import React from 'react'
import Image from 'next/image'
import emoji from '@/assets/Frame 407.png'


const HeaderContactButton = () => {
  return (
    <div className="absolute bottom-20 right-20 cursor-pointer">
        <Image className='' src={emoji} alt="" onClick={() => document.getElementById('contactForm')?.scrollIntoView()} />
    </div>
  )
}

export default HeaderContactButton