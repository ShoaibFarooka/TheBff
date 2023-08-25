import React , {useState}from 'react'
import downArrow from '@/assets/Vector (4).png'
import { isEmail } from '@/lib'
import Image from 'next/image';
import { toast, Toaster } from 'react-hot-toast'
export default function Partner({showSubmit , setShowSubmit } : {showSubmit : boolean , setShowSubmit : (visible : boolean) => void}) {
    const handleClikc = () => {
        setShowSubmit(!showSubmit);
      };
     
  const [isLoading, setIsLoading] = React.useState(false)

  // cookie.delete('contact_count')

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const name = e.target.name.value,
          email = e.target.email.value,
          phone = e.target.phone.value,
          InterestedIn = e.target.InterestedIn.value,
          gymName = e.target.gymName.value,
          City = e.target.City.value,
          message = e.target.message.value

    if(!isEmail(email)) return toast.error('Invalid email address')

    
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
      body: JSON.stringify({ name, email, phone, InterestedIn, gymName, City, message })
    })

    if(res.status !== 200) {
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
                <form className=" flex flex-col w-full md:w-1/3"  onSubmit={handleSubmit}>
                  <label className="text-start" htmlFor="">
                    Interested In?
                  </label>

                  <select name = "InterestedIn" className="rounded-lg py-2 text-black px-3" id="cars">
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
                    name = "name"
                    required
                    minLength={4}
                    autoFocus
                  />

                  <label className="text-start">Email</label>
                  <input
                    className="rounded-lg py-2 px-3"
                    type="emai"
                    placeholder="Enter your email"
                    name = "email"
                    required
                  />

                  <label className="text-start">Phone number</label>
                  <input
                    className="rounded-lg py-2 px-3"
                    type="tel"
                    placeholder="Enter your Phone Number"
                    name = "phone"
                    required
                  />

                  <label  className="text-start">City Interested In?</label>

                  <select name = "City" className="rounded-lg py-2 text-black px-3" id="cars">
                    <option value="volvo">Select One</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="chennai">Chennai</option>
                  </select>

                  <label className="text-start" htmlFor="">
                    Gym Name (for existing gym owners)
                  </label>
                  <input
                    className="rounded-lg py-2 px-3"
                    type="text"
                    placeholder="Enter Gym names separated by comma"
                    name = "gymName"
                    required
                  />

                  <label className="text-start"> Message</label>
                  <textarea
                    className="rounded-lg px-3"
                    rows={10}
                    placeholder="Enter your Message here"
                    name = "message"
                    required
                    minLength={20}
                    maxLength={400}
                  ></textarea>
                </form>
              </div>
              <div className="my-5">
                <button 
                className="bg-[#514ED8] px-10 text-white py-2 rounded-3xl"
                type="submit"  disabled={isLoading}>
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
    </div>
  )
}
