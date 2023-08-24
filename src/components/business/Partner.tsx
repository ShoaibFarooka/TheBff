import React from 'react'
import downArrow from '@/assets/Vector (4).png'

import Image from 'next/image';
export default function Partner({showSubmit , setShowSubmit } : {showSubmit : boolean , setShowSubmit : (visible : boolean) => void}) {
    const handleClikc = () => {
        setShowSubmit(!showSubmit);
      };
  return (
    <div>
         <div className="text-center">
          <button
            onClick={handleClikc}
            className={showSubmit ? "text-black font-bold bg-white px-24 py-3  rounded-2xl my-10" : "text-black font-bold bg-white px-10 py-2  rounded-2xl my-10"}
          >
            {showSubmit ? 
                 <Image src={downArrow} alt = "" />  : "Partner With Us" }
          </button>
          {showSubmit && (
            <>
              <div className="flex justify-center px-10">
                {/* Fix spacing issues - add form handling */}
                <form className="text-white flex flex-col w-full md:w-1/3">
                  <label className="text-start" htmlFor="">
                    Interested In?
                  </label>

                  <select className="rounded-lg py-2 text-black px-3" id="cars">
                    <option className="text-black" value="volvo">
                      Select One
                    </option>
                    <option className="text-black" value="saab">
                      Saab
                    </option>
                    <option className="text-black" value="opel">
                      Opel
                    </option>
                    <option className="text-black" value="audi">
                      Audi
                    </option>
                  </select>

                  <label className="text-start"> Name</label>
                  <input
                    className="rounded-lg py-2 px-3"
                    type="text"
                    placeholder="Enter your Name"
                  />

                  <label className="text-start">Email</label>
                  <input
                    className="rounded-lg py-2 px-3"
                    type="emai"
                    placeholder="Enter your email"
                  />

                  <label className="text-start">Phone number</label>
                  <input
                    className="rounded-lg py-2 px-3"
                    type="text"
                    placeholder="Enter your Name"
                  />

                  <label className="text-start">City Interested In?</label>

                  <select className="rounded-lg py-2 text-black px-3" id="cars">
                    <option value="volvo">Select One</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                  </select>

                  <label className="text-start" htmlFor="">
                    Gym Name (for existing gym owners)
                  </label>
                  <input
                    className="rounded-lg py-2 px-3"
                    type="text"
                    placeholder="Enter city names separated by comma"
                  />

                  <label className="text-start"> Message</label>
                  <textarea
                    className="rounded-lg px-3"
                    rows={10}
                    placeholder="Enter your Message here"
                  ></textarea>
                </form>
              </div>
              <div className="my-5">
                <button className="bg-[#514ED8] px-10 text-white py-2 rounded-3xl">
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
    </div>
  )
}
