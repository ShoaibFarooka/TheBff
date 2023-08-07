import Image from "next/image"
import Instagram from "@/assets/instagram 1.png"
import Twitter from "@/assets/Twitter (1).png"
import Gmail from "@/assets/Gmail (1).png"
import LinkedIn from "@/assets/linkedin-svgrepo-com 1.png"
export default function Footer() {
   
  return (
    <div className="bg-gradient-to-r from-[#4A2F70] to-[#344363]">

        <div className="flex flex-col md:flex-row  md:justify-around md:items-start  text-white px-10 py-20 rounded-xl">
            <div className="md:w-1/5">
                <p className=" text-[#AFCCF8] font-semibold text-[40px] text-center -mt-3 mb-5">LOGO</p>
                <p className="text-center ">Get the latest articles and business updates that you need to know, you’ll even get special recommendations weekly.</p>
            </div>
            <div>
                
            </div>
            <div className="text-center md:text-left">
                <h1 className="text-xl font-semibold">Website Links</h1>
                <p className="md:text-sm font-[400] my-2">Home</p>
                <p className="text-sm font-[400] my-2"  >About</p>
                <p className="text-sm font-[400] my-2">Get in touch</p>
                <p className="text-sm font-[400] my-2">FAQs</p>
            </div>
            <div className="text-center  md:text-left">
                <h1 className="text-xl font-semibold">Services</h1>
                <p className="text-sm font-[400] my-2">Service 1</p>
                <p className="text-sm font-[400] my-2">Service 2</p>
                <p className="text-sm font-[400] my-2">Service 3</p>
            </div>
            <div className="text-center  md:text-left">
                <h1 className="text-xl font-semibold">Services</h1>
                <p className="text-sm font-[400] my-2">Service 1</p>
                <p className="text-sm font-[400] my-2">Service 2</p>
                <p className="text-sm font-[400] my-2">Service 3</p>
            </div>
            <div className="text-center ">
                <h1 className="text-xl font-semibold md:text-left">Soicals</h1>
                <div className="flex justify-center mt-2">
                    <Image className="mr-3" src={Instagram} alt={""} />
                    <Image className="mr-3" src={Twitter} alt={""} />
                    <Image className="mr-3" src={Gmail} alt={""} />
                    <Image className="mr-3" src={LinkedIn} alt={""} />
                </div>
            </div>
        </div>
        <p className="text-[#757575] text-center">©2023 BFF. All rights reserved.</p>
    </div>
  )
}
