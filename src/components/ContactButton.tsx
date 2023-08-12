import React from 'react'
import Image from 'next/image'
import emoji from '@/assets/headset.png'

const ContactButton = () => {
  return (
    <div className="absolute bottom-10 right-10 md:bottom-16 md:right-16 lg:bottom-10 lg:right-10">
        <Image className='' src={emoji} alt="" />
    </div>
  )
}

export default ContactButton