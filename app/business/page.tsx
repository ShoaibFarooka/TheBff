
"use client";
import React, { useState } from 'react'

import Header from '@/components/business/Header'


import Base1 from '@/assets/Base feature icon.png'
import Base2 from '@/assets/Base feature icon (1).png'
import Base3 from '@/assets/Base feature icon (2).png'
import Base4 from '@/assets/Base feature icon (3).png'
import Base5 from '@/assets/Base feature icon (4).png'
import Base6 from '@/assets/Base feature icon (5).png'
import Image from 'next/image'

export default function Page() {
    const [showSubmit , setShowSubmit] = useState(false)
    const handleClikc = () => {
        setShowSubmit(!showSubmit)
    }
  return (
    <>
    <div className='mt:20 md:mt-32 flex flex-col justify-center items-center w-full'>

        <h1 className="font-semibold text-center text-[40px] lg:text-[72px] text-[#F2BD4D] mb-12">
        
        Introducing BFF Business

        </h1>
        <Header />

        </div>
    <div className="px-4 md:px-8  lg:px-12 mb-20 mt-20">
        <h1 className="font-bold text-center text-[40px] lg:text-[72px] text-[#fff] mb-4">
            Why Partner With Us

        </h1>
        <p className='text-white text-center'>Lorem ipsum is common placeholder text used to demonstrate the graphic elements of a document or visual presentation.</p>
        <div className='px-36 py-20 grid grid-cols-3 gap-28'>

            <div >
                <div className='flex justify-center'>
                    <Image src={Base1} alt='' />
                </div>
                <p className='text-[30px] font-bold text-center text-white'>Robust Woekflow</p>
                <p className='text-[#C2C2C2] text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum.</p>
            </div>
            <div >
                <div className='flex justify-center'>
                    <Image src={Base2} alt='' />
                </div>
                <p className='text-[30px] font-bold text-center text-white'>Flexibility</p>
                <p className='text-[#C2C2C2] text-center '>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum.</p>
            </div>
            <div >
                <div className='flex justify-center'>
                    <Image src={Base3} alt='' />
                </div>
                <p className='text-[30px] font-bold text-center text-white'>User friendly</p>
                <p className='text-[#C2C2C2] text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum.</p>
            </div>
            <div >
                <div className='flex justify-center'>
                    <Image src={Base4} alt='' />
                </div>
               
                <p className='text-[30px] font-bold text-center text-white'>Multiple layouts</p>
                <p className='text-[#C2C2C2] text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum.</p>
            </div>
            <div>
                <div className='flex justify-center'>
                    <Image src={Base5} alt='' />
                </div>
                <p className='text-[30px] font-bold text-center text-white'>Better components</p>
                <p className='text-[#C2C2C2] text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum.</p>
            </div>
            <div >
                <div className='flex justify-center'>
                    <Image src={Base6} alt='' />
                </div>
                <p className='text-[30px] font-bold text-center text-white'>Well organised</p>
                <p className='text-[#C2C2C2] text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat nibh tristique ipsum.</p>
            </div>


        </div>
    </div>
    <div>
        <p className='text-white text-[40px] font-bold text-center'>Interested in becoming a Bff Partner</p>
        <p className='text-white text-center'> Please fill out the form if you are interested in partnering with us </p>
        <div className='text-center'>
            <button onClick={handleClikc} className='text-black font-bold bg-white px-10 py-2  rounded-2xl my-10'>Partner With Us</button>
            {showSubmit && 
            <>
             <div className='flex justify-center'>
            <form className='text-white flex flex-col w-1/3'>

                    <label className='text-start' htmlFor="">Interested In?</label>


                    <select className='rounded-lg py-2 text-black' id="cars">
                    <option className='text-black' value="volvo">Select One</option>
                    <option className='text-black' value="saab">Saab</option>
                    <option className='text-black' value="opel">Opel</option>
                    <option className='text-black' value="audi">Audi</option>
                    </select>

                    <label  className='text-start'> Name</label>
                    <input  className='rounded-lg py-2' type="text" placeholder='Enter your Name' />

                    <label  className='text-start'>Email</label>
                    <input className='rounded-lg py-2' type='emai' placeholder='Enter your email' />

                    <label  className='text-start'>Phone number</label>
                    <input className='rounded-lg py-2' type="text" placeholder='Enter your Name' />

                    <label  className='text-start'>City Interested In?</label>


                    <select className='rounded-lg py-2 text-black' id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                    </select>

                    <label  className='text-start' htmlFor="">Gym Name (for existing gym owners)</label>
                    <input className='rounded-lg py-2' type="text" placeholder='Enter city names separated by comma' />



                    <label  className='text-start'> Message</label>
                    <textarea className='rounded-lg' rows={10} placeholder='Enter your Message here'>

                    </textarea>
            </form>
       
            </div>
            <div className='my-5'>
            <button className='bg-[#514ED8] px-10 text-white py-2 rounded-3xl'>Submit</button>
            </div>
            </>
           
                
            }
            
          

           

        </div>
       
    </div>
    
    
    </>
    
  )
}
