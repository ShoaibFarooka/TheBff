"use client"
import React from 'react'
import { isEmail } from '@/lib'
import Image from 'next/image'
import emoji from '@/assets/headset.png'
import { toast, Toaster } from 'react-hot-toast'

const ContactForm = () => {

    const [email, setEmail] = React.useState('')

    const handleSubmit = async () => {

        if (!isEmail(email)) {
            toast.error('Please enter a valid email.')
            return
        }

        const tid = toast.loading('Submitting...')

        try {
            const res = await fetch('/api/newsletter/subscribe?email=' + email)
            const data = await res.json()
    
            if(!data.success) return toast.error(data.message ?? "Something went wrong", { id: tid })
            return toast.success(data.message ?? "Please check your email and confirm sibscription", { id: tid })

        } catch (error) {
            toast.error('Something went wrong, please try again later.', { id: tid })
            return
        }

    }


    return (
      <div className="px-4 md:px-8 lg:px-12 py-14" id="contactForm">
        <div className="rounded-3xl bg-gradient-to-r from-[#4A2F70] to-[#344363] px-8 py-8 lg:py-14">
          <div className="flex flex-col md:flex-row md:gap-x-10 gap-y-8">
            <div className="text-gray-100 col-span-1  md:w-5/12 my-auto">
              <h2 className="text-5xl font-semibold text-center">
                Subscribe to our newsletter
              </h2>
              <p className="max-w-[80%] mx-auto text-center mt-5">
                Sign up to be the first to know about our latest news, products,
                and exclusive deals.
              </p>
            </div>

            <div className="col-span-1 my-auto md:w-4/12">
              <label
                htmlFor="emailInput"
                className="py-2 pl-5 pr-1 md:pr-3 bg-gray-300 bg-opacity-30 rounded-full my-auto flex"
              >
                <input
                  type="text"
                  id="emailInput"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pr-3 bg-transparent outline-none w-8/12 border-none text-white"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-[#FED25B] rounded-full px-3 py-1 md:px-4 md:py-2 md:w-4/12 text-black font-semibold"
                >
                  Sign Up
                </button>
              </label>
            </div>

            <div className="w-full md:w-3/12">
              <Image className="mx-auto w-[70%]" src={emoji} alt="" />
            </div>
          </div>
        </div>

        <Toaster />
      </div>
    );
}

export default ContactForm