import ContactForm from "@/components/ContactForm";
import Coaches from "@/components/home/Coaches";
import { getPageData } from "@/lib/db";
import Image from "next/image";

// Import Assets
import Component22 from "@/assets/Component 22.png";
import Component23 from "@/assets/Component 23.png";
import Component34 from "@/assets/Component 34.png";
import Component35 from "@/assets/Component 35.png";
import Component36 from "@/assets/Component 36.png";
import Component38 from "@/assets/Component 38.png";
import Component42 from "@/assets/Component 42.png";
import Component43 from "@/assets/Component 43.png";
import Component44 from "@/assets/Component 44.png";
import LoginPopup from "@/components/auth/LoginPopup";
import Classes from "@/components/home/Classes";
import { Metadata } from "next";

// preload "/fitness.mp4",
export const metadata: Metadata = {
  icons: {
    other: [
      {
        rel: "preload",
        url: "/fitness.mp4",
        type: "video/mp4",
      }
    ]
  }
}

export default async function Home() {
  const pageData = (await getPageData("home")) as any;
  const classes = pageData?.classes;
  const coaches = pageData?.coches;

  return (
    <>
      {/* <Head>
        <link rel="preload" href="/fitness.mp4" as="video" />
      </Head> */}

      <div id="home" className="relative min-h-[90vh] bg-opacity-20">
        {/* <div className="w-full bg-[#00000090]"></div> */}

        <video
          controls={false}
          autoPlay
          loop
          muted
          className="w-full h-screen object-cover aboslute top-0 left-0"
        >
          <source src="/fitness.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="w-full">
            <div className="text-white text-center text-[24px] md:text-[40px] font-bold mb-2">
              Bored with your gym routine,
            </div>

            <div className="text-center text-[24px] md:text-[40px] font-bold text-[#FED25B]">
              try working out with BFF!
            </div>
          </div>
        </div>
      </div>

      {/* ===========================Types of Programs===================== */}
      <Classes classes={classes} />

      {/* ===================== {Gallery} ===================== */}
      <div className="relative py-5 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:px-32 lg:gap-x-7 mx-auto">
          <div className="col-span-1 flex flex-col gap-y-7">
            <div className="w-full">
              <Image
                src={Component22}
                alt=""
                className="w-10/12 rounded-md mx-auto"
              />
            </div>
            <div className="w-full">
              <Image
                src={Component34}
                alt=""
                className="w-10/12 rounded-md mx-auto"
              />
            </div>
            <div className="w-full">
              <Image
                src={Component42}
                alt=""
                className="w-10/12 rounded-md mx-auto"
              />
            </div>
          </div>

          <div className="hidden  md:col-span-1 md:flex flex-col gap-y-7 md:mt-10">
            <div className="w-full">
              <Image
                src={Component23}
                alt=""
                className="w-10/12 rounded-md mx-auto"
              />
            </div>
            <div className="w-full">
              <Image
                src={Component35}
                alt=""
                className="w-10/12 rounded-md mx-auto"
              />
            </div>
            <div className="w-full">
              <Image
                src={Component43}
                alt=""
                className="w-10/12 rounded-md mx-auto"
              />
            </div>
          </div>

          <div className="hidden col-span-1 md:flex flex-col gap-y-7">
            <div className="w-full">
              <Image
                src={Component38}
                alt=""
                className="w-10/12 rounded-md mx-auto"
              />
            </div>
            <div className="w-full">
              <Image
                src={Component36}
                alt=""
                className="w-10/12 rounded-md mx-auto"
              />
            </div>
            <div className="w-full">
              <Image
                src={Component44}
                alt=""
                className="w-10/12 rounded-md mx-auto"
              />
            </div>
          </div>
        </div>

        {/* ===================== {Overlay} ===================== */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 center z-30">
          <div className="w-full md:w-1/2  mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-white text-center backdrop-blur bg-black bg-opacity-50">
              {" "}
              Achieve your fitness goals without stepping out of your comfort
              zone{" "}
            </h2>
          </div>
        </div>
      </div>

      {/* ============================== YOGA COACHES ======================= */}
      <Coaches coaches={coaches as any} />

      {/* ===================== {Contact Form} ===================== */}

      <ContactForm />

      <LoginPopup />
    </>
  );
}

export const dynamic = "error";
