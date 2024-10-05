"use client"
import emoji from '@/assets/headset.png'
import { isEmail } from '@/lib'
import Image from 'next/image'
import React from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const ContactButtonPopup = () => {

  const [showPopup, setShowPopup] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  // cookie.delete('contact_count')

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const name = e.target.name.value,
      email = e.target.email.value,
      message = e.target.message.value

    if (!isEmail(email)) return toast.error('Invalid email address')


    // let count = cookie.get('contact_count') || 0
    // count = parseInt(count as string)
    // alert(count)
    // if(count >= 3) return toast.error('You have reached the maximum number of messages you can send today. Please try again later.')

    setIsLoading(true)

    const tid = toast.loading('Sending message...')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    })

    if (res.status !== 200) {
      toast.error('Something went wrong. Please try again later.', { id: tid })
      return setIsLoading(false)
    }

    toast.success('Message sent successfully. We will get back to you as soon as possible.', { id: tid })


    // save/update count in cookie and set it to expire today 12am. Use maxAge instead of expires to set expiry in seconds
    // time between now and 12am
    // const now = new Date()
    // const timeToMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime() - now.getTime()
    // cookie.set('contact_count', count + 1 as any as string, timeToMidnight / 1000)

    setIsLoading(false)

  }

  return (
    <div className="fixed bottom-5 right-5 md:bottom-16 md:right-16 lg:bottom-10 lg:right-10 z-20">

      <div id="global-contact-button" className="max-w-max rounded-full bg-white/10 backdrop-blur-md cursor-pointer" onClick={() => setShowPopup(!showPopup)}>
        <Image className='w-16 h-16 md:w-24 md:h-24' src={emoji} alt="" />
      </div>

      {
        showPopup && (
          <div
            className={"absolute bottom-0 right-0 shadow-xl shadow-black/20 flex flex-col items-center justify-center rounded-md bg-black/30 backdrop-blur-xl py-3 " + (showPopup ? "zoomIn min-w-min min-h-min" : "w-16 h-16 md:w-28 md:h-28")}>
            {/* <div className="flex flex-col items-center justify-center rounded-md bg-black/30 backdrop-blur-xl py-3"> */}

            <div className="mb-6 flex justify-between items-end w-full px-5">

              <h3 className="text-2xl font-bold text-purple-400"> Contact Us </h3>

              <AiOutlineCloseCircle
                size={30}
                className="fill-red-400 hover:opacity-70 cursor-pointer"
                onClick={() => setShowPopup(false)}
              />
            </div>

            <form className="px-5 text-white w-72" onSubmit={handleSubmit}>
              <input
                type="text"
                className="py-2 pl-3 mb-4 bg-gray-300 bg-opacity-30 rounded-full w-full"
                placeholder="Your name"
                name="name"
                autoFocus
                required
                minLength={4}
              />

              <input
                type="email"
                className="py-2 pl-3 mb-4 bg-gray-300 bg-opacity-30 rounded-full w-full"
                placeholder="Your email"
                name="email"
                required
              />

              <textarea
                className="py-2 pl-3 mb-4 bg-gray-300 bg-opacity-30 rounded-md w-full"
                placeholder="Your message"
                name="message"
                rows={4}
                required
                minLength={20}
                maxLength={400}
              />

              <button
                className="px-5 py-2 mx-auto rounded-full border border-transparent bg-purple-500 hover:bg-purple-400 outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-purple-100"
                type="submit"
                disabled={isLoading}
              >
                Submit
              </button>

            </form>
            {/* </div> */}
          </div>
        )
      }

      <Toaster />

    </div>
  )
}

export default ContactButtonPopup