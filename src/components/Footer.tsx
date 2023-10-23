import Image from "next/image";
import Instagram from "@/assets/instagram 1.png";
// import Twitter from "@/assets/Twitter (1).png";
import Gmail from "@/assets/Gmail (1).png";
// import LinkedIn from "@/assets/linkedin-svgrepo-com 1.png";
import Logo from "./Logo";
import Link from "next/link";

const links = {
  email: "mailto:thebffupdates@gmail.com",
  socials: {
    instagram: "https://instagram.com/thebffgym015",
  },
  websiteLinks: {
    Home: "/",
    About: "/about",
    Programs: "/programs",
    Pricing: "/programs#pricing",
    Blogs: "/blog",
    // Contact: "/contact",
  },
};

export default function Footer() {
  return (
    <div className="py-10 px-4 md:px-8 lg:px-12">
      <div className="rounded-3xl bg-gradient-to-r from-[#4A2F70] to-[#344363]">
        <div className="flex flex-col md:flex-row  md:justify-center md:items-start text-white px-3 md:px-10 py-20 rounded-xl">
          <div className="md:w-1/5 md:mr-10">
            <div className=" text-[#AFCCF8] font-semibold text-[40px] text-center -mt-3 mb-5">
              <Logo />
            </div>
            <div className="text-center ">
              Get the latest articles and business updates that you need to
              know, you{"’"}ll even get special recommendations weekly.
            </div>
          </div>
          <div></div>
          <div></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 md:mt-0">
            <div className="text-center md:text-left">
              <h1 className="text-xl font-semibold">Website Links</h1>
              {Object.entries(links.websiteLinks).map(([key, value], index) => (
                <Link href={value} key={"link-" + index}>
                  <h2 className="text-sm font-[400] my-2 hover:text-blue-400">{key}</h2>
                </Link>
              ))}
              {/* <div className="md:text-sm font-[400] my-2">Home</div>
              <div className="text-sm font-[400] my-2">About</div>
              <div className="text-sm font-[400] my-2">Get in touch</div>
              <div className="text-sm font-[400] my-2">FAQs</div> */}
            </div>
            <div></div>

            {/* <div className="text-center  md:text-left">
              <h1 className="text-xl font-semibold">Services</h1>
              <div className="text-sm font-[400] my-2">Service 1</div>
              <div className="text-sm font-[400] my-2">Service 2</div>
              <div className="text-sm font-[400] my-2">Service 3</div>
            </div>

            <div className="text-center  md:text-left">
              <h1 className="text-xl font-semibold">Services</h1>
              <div className="text-sm font-[400] my-2">Service 1</div>
              <div className="text-sm font-[400] my-2">Service 2</div>
              <div className="text-sm font-[400] my-2">Service 3</div>
            </div> */}

            <div className="text-center ">
              <h1 className="text-xl font-semibold md:text-left">Soicals</h1>

              <div className="flex mt-2 gap-2">
                <a href={links.socials.instagram} target="_blank">
                  <Image
                    className="mr-3 w-8 h-8 md:w-full md:h-full"
                    src={Instagram}
                    alt={""}
                  />
                </a>
                <a href={links.email} target="_blank">
                  <Image
                    className="mr-3 w-8 h-8 md:w-full md:h-full"
                    src={Gmail}
                    alt={""}
                  />
                </a>
                {/* <Image
                  className="mr-3 w-8 h-8 md:w-full md:h-full"
                  src={Twitter}
                  alt={""}
                />
                <Image
                  className="mr-3 w-8 h-8 md:w-full md:h-full"
                  src={LinkedIn}
                  alt={""}
                /> */}
              </div>
            </div>
          </div>
        </div>

        <div className="pb-10">
          <p className="text-[#757575] text-center">
            ©{new Date().getFullYear()} BFF. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
