import React from 'react'
import Image from 'next/image'
import emoji from '@/assets/Frame 407.png'

const ContactButton = () => {
  return (
    <div className="absolute bottom-10 right-10">
        <Image className=' absolute bottom-20 right-20' src={emoji} alt="" />
    </div>
  )
}

export default ContactButton