// import Image from "next/image";
// import Instagram from "@/assets/instagram 1.png";
// import Twitter from "@/assets/Twitter (1).png";
// import Gmail from "@/assets/Gmail (1).png";
// import LinkedIn from "@/assets/linkedin-svgrepo-com 1.png";

import Link from "next/link";
import { BiLogoGmail } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import Logo from "./Logo";

const links = {
  email: "mailto:thebffupdates@gmail.com",
  socials: {
    instagram: "https://instagram.com/thebffgym015",
  },
  websiteLinks: {
    Home: "/",
    // About: "/about",
    Programs: "/programs",
    Pricing: "/programs#pricing",
    Blogs: "/blog",
    Contact: "/contact-us",
  },
  legalLinks: {
    "Privacy Policy": "/privacy-policy",
    "Terms & Conditions": "/terms-and-conditions",
    "Cancellation Policy": "/cancellation-policy"
  }
};

export default function Footer() {
  return (
    <div className="py-10 px-4 md:px-8 lg:px-12">
      <div className="rounded-3xl bg-gradient-to-r from-[#4A2F70] to-[#344363]">
        <div className="grid grid-cols-3 md:justify-between md:items-start bg-blue-100/10 text-white px-3 pt-10 pb-20 md:px-24 rounded-xl mx-auto">
          <div className="col-span-3 md:col-span-1 md:mr-10">
            <div className=" text-[#AFCCF8] font-semibold text-[40px] text-center mb-5">
              <Logo />
            </div>
            <p className="">
              Get the latest articles and business updates that you need to
              know, you{"’"}ll even get special recommendations weekly.
            </p>
          </div>

          <div className="col-span-3 md:col-span-2">
            <div className="grid grid-cols-6 gap-6 md:gap-16 mt-10 md:mt-0">
              <div className="text-left col-span-3 md:col-span-2">
                <h1 className="text-xl font-semibold mb-5">Website Links</h1>

                {Object.entries(links.websiteLinks)?.map(([key, value], index) => (
                  <Link href={value} key={"footer-link-" + index}>
                    <h2 className="text-sm font-[400] my-2 hover:text-blue-400">
                      {key}
                    </h2>
                  </Link>
                ))}
              </div>

              {/* legals */}
              <div className="text-left col-span-3 md:col-span-2">
                <h1 className="text-xl font-semibold mb-5">Legal</h1>

                {Object.entries(links.legalLinks)?.map(([key, value], index) => (
                  <Link href={value} key={"footer-link-" + index}>
                    <h2 className="text-sm font-[400] my-2 hover:text-blue-400">
                      {key}
                    </h2>
                  </Link>
                ))}
              </div>

              <div className="text-left col-span-6 md:col-span-2">
                <h1 className="text-xl font-semibold mb-5">Soicals</h1>

                <div className="flex mt-2 gap-2">
                  <a href={links.socials.instagram} target="_blank">
                    <FaInstagram className="text-4xl instagram-logo-gradient rounded-lg p-0.5" />
                  </a>
                  <a href={links.email} target="_blank">
                    <BiLogoGmail className="text-4xl fill-red-500 bg-gray-100 rounded-lg p-0.5" />
                  </a>
                </div>
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
