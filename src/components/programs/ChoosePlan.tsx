import React , {useState} from 'react'
// import cross from "@/assets/Cross.png";
import tick from "@/assets/Vector 2.png";
import Image from "next/image";
import { RxCrossCircled, RxCross2 } from "react-icons/rx";
export default function ChoosePlan({overlayVisible , setOverlayVisible } : {overlayVisible : boolean , setOverlayVisible : (visible : boolean) => void}) {
    const onClose = () => {
        setOverlayVisible(!overlayVisible);
      };
      const content = [
        {
          title1: '1999',
          
          title2 : '3499'
        }, {
          title1: '5999',
          
          title2 : '10499'
          
        }, {
          title1: '11999',
          
          title2 : '20999'
          
        }, 
      ]
      const [active, setActive] = useState(0);
  return (
    <div className="absolute md:fixed top-0 left-0 w-screen h-full md:h-screen bg-black bg-opacity-30 backdrop-blur-md z-[99999999] px-2 md:px-10 py-5">
            <div className="w-full  flex justify-center z-50">
              <div className="w-full md:w-11/12 px-5 md:px-10 py-5 bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-[24px] ">
                <div className="w-full   mx-auto relative flex justify-center items-center ">
                  <button
                    onClick={onClose}
                    className="absolute top-0 left-0 md:top-2 md:left-2 bg-white rounded-2xl p-1 group hover:bg-red-500"
                  >
                    {/* <Image src={cross} alt="" /> */}
                    <RxCross2 size={20} className="fill-red-500 text-red-500 group-hover:text-white" />
                  </button>
                  <h2 className="text-2xl md:text-5xl font-bold text-[#F2BD4D] text-center mb-4 ">
                    Choose Plan
                  </h2>
                </div>
                <div className="w-full   mx-auto mb-4 ">
                  <p className="text-white text-center text-xs md:text-base">
                    Gorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam eu turpis molestie, dictum est a, mattis tellus.
                  </p>
                </div>
                <div className="flex justify-center items-center ">
                  <div className="inline bg-white px-1 py-1 rounded-md">
                    <button 
                    className="md:px-4 px-2 py-2 hover:bg-blue-300 hover:text-white rounded-md focus:text-white focus:bg-[#6557FF]"
                    onClick={() => setActive(0)}>
                      {" "}
                      1 month{" "}
                    </button>
                    <button 
                    className="px-4 py-2 hover:bg-blue-300 hover:text-white rounded-md focus:text-white focus:bg-[#6557FF]"
                    onClick={() => setActive(1)}
                    >
                      3 month{" "}
                    </button>
                    <button className="px-4 py-2 hover:bg-blue-300 hover:text-white rounded-md focus:text-white focus:bg-[#6557FF]"
                    onClick={() => setActive(2)}
                    >
                      6 month
                    </button>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row   justify-center md:items-center py-6  ">
                  <div className="bg-[#E7E7FF] px-3 py-2 md:py-7 md:px-10 rounded-lg md:mx-5 mb-5 md:mb-0">
                    <h2 className="font-[600] text-2xl text-center">
                      Standard
                    </h2>
                    <h3 className="text-center text-[24px] font-semibold"> ₹{content[active].title1} <span className='text-gray-500 text-[16px] font-light'>/month</span></h3>
                    <hr className="border border-black mt-10" />
                    <div className="mt-10">
                      <div>
                        <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                          <Image src={tick} alt="" />
                        </button>
                        <span>Create personal dashboard</span>
                      </div>

                      <div className="mt-5">
                        <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                          <Image src={tick} alt="" />
                        </button>
                        <span>Trainer Support</span>
                      </div>

                      <div className="mt-5">
                        <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2 ">
                          <Image src={tick} alt="" />
                        </button>
                        <span>Rewards & Achievement&#39;s</span>
                      </div>
                      <div className="flex items-center justify-center pt-8 pb-3">
                        <button className="px-5 py-2 rounded-lg  text-white bg-[#6557FF]">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFCC61] px-3 py-12 md:px-10 rounded-lg md:mx-5 mb-5 md:mb-0">
                    <div className="text-center">
                      <button className="text-white bg-[#6557FF] px-1 rounded-md">
                        -30%
                      </button>
                    </div>
                    <h2 className="font-[600] text-2xl  text-center">
                      Premium
                    </h2>
                    <h3 className="text-center text-[24px] font-semibold"> ₹{content[active].title2} <span className='text-gray-500 text-[16px] font-light'>/month</span></h3>
                    <hr className="border border-black mt-10" />
                    <div className="mt-10">
                      <div>
                        <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                          <Image src={tick} alt="" />
                        </button>
                        <span>All features in Stadard</span>
                      </div>

                      <div className="mt-5">
                        <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                          <Image src={tick} alt="" />
                        </button>
                        <span>Pause Membership on your ease</span>
                      </div>

                      <div className="mt-5">
                        <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                          <Image src={tick} alt="" />
                        </button>
                        <span>Custom Nutrition Plans</span>
                      </div>
                      <div className="flex items-center justify-center pt-8">
                        <button className="px-5 py-2 rounded-lg  text-white bg-[#6557FF]">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#E7E7FF] px-3 py-7 md:px-10 rounded-lg ">
                    <h2 className="font-[600] text-2xl  text-center">
                      Enterprise
                    </h2>
                    <h3 className="text-center">Contact Us</h3>
                    <hr className="border border-black mt-10" />
                    <div className="mt-10">
                      <div>
                        <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                          <Image src={tick} alt="" />
                        </button>
                        <span>All features in Premium Plan</span>
                      </div>

                      <div className="mt-5">
                        <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                          <Image src={tick} alt="" />
                        </button>
                        <span>Bulk Discount</span>
                      </div>

                      <div className="mt-5">
                        <button className="px-2 py-2 bg-[#363535] rounded-3xl mr-2">
                          <Image src={tick} alt="" />
                        </button>
                        <span>24*7 Support</span>
                      </div>
                      <div className="flex items-center justify-center pt-8">
                        <button className="px-5 py-2 rounded-lg  text-white bg-[#6557FF]">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}
