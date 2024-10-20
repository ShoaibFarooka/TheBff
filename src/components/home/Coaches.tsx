"use client";
import Image, { StaticImageData } from "next/image";

import { Mousewheel, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Assets
import coach_arpandeep_singh from "@/assets/coach_arpandeep_singh.png";
// import coach_ashif from "@/assets/coach_ashif.png";
import coach_diksha_parihar from "@/assets/coach_diksha_parihar.png";
import coach_dinesh_maru from "@/assets/coach_dinesh_maru.png";
import coach_gurpreet_singh from "@/assets/coach_gurpreet_singh.png";
import coach_harpreet_singh from "@/assets/coach_harpreet_singh.png";
import coach_prachi_dabas from "@/assets/coach_prachi_dabas.png";


const coaches1 = [
  { name: "Gurpreet Singh", title: "Personal Trainer", image: coach_gurpreet_singh },
  { name: "Diksha Parihar", title: "Dietician", image: coach_diksha_parihar },
  { name: "Harpreet Singh", title: "Personal Trainer", image: coach_harpreet_singh },
  { name: "Dinesh Maru", title: "Dance", image: coach_dinesh_maru },
  { name: "Arpandeep Singh", title: "Personal Trainer", image: coach_arpandeep_singh },
  { name: "Prachi Dabas", title: "Yoga", image: coach_prachi_dabas },
  // { name: "Ashif Khan", title: "Personal Trainer", image: coach_ashif },
];

// ===================== {Coach} =====================
const Coach = ({
  image,
  name,
  title,
}: {
  image: StaticImageData | string;
  name: string;
  title?: string;
}) => {
  return (
    <div className="flex-shrink-0 text-white mb-1 center flex-col py-3">
      <Image
        className="max-h-[200px] object-contain md:max-h-[431px] hover:scale-105 duration-300 mb-3 mx-auto"
        src={image}
        alt="/"
        width={280}
        height={1000}
      />

      <p className="text-center"> {name} </p>
      {/* {title && <p className="text-center"> {title} </p>} */}
    </div>
  );
};

type Coach = {
  image: StaticImageData | string;
  name: string;
  title?: string;
};

const Coaches = ({ coaches }: { coaches: Coach[] }) => {
  // const ref = React.useRef<HTMLDivElement>(null);

  // React.useEffect(() => {
  //   // keep scrolling to the right
  //   const interval = setInterval(() => {
  //     if (ref.current) {
  //       ref.current.scrollLeft += 50;
  //     }
  //   }, 50);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="mb-10 sm:px-[100px] sm:py-[60px] px-[40px] py-[20px]">
      <div className="">
        <p className="text-2xl sm:text-[50px] sm:mb-8 lg:mb-8 text-[#AFCCF8] font-[600] text-center">
          Meet Our Fitness Trainers
        </p>
        <p className="text-[#F2BD4D] font-[600] text-center sm:mb-12 lg:max-w-[50%] mx-auto">
          Our certified fitness gurus will turn your workouts from Blah to
          Ta-Da! Get personal training from the best online fitness coaches.
        </p>
      </div>

      <div className="mt-8">
        <Swiper
          modules={[Scrollbar, Mousewheel]}
          slidesPerView={2}
          // centeredSlides
          spaceBetween={2}
          draggable={true}
          simulateTouch={true}
          scrollbar={{
            el: ".swiper-scrollbar",
            hide: false,
            enabled: true,
            draggable: true,
            snapOnRelease: true,
            horizontalClass: "!bg-white/70",
          }}
          mousewheel={{
            sensitivity: 2,
            forceToAxis: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            // 700: {
            //   slidesPerView: 2,
            // },
            900: {
              slidesPerView: 3,
            },
          }}
          className="pt-4 min-h-min"
        >
          {coaches1?.map((coach, index) => (
            <SwiperSlide className="mb-5" key={`slide-${index + 1}`}>
              <Coach
                key={"coach-" + index}
                image={coach.image}
                name={coach.name}
                title={coach.title}
              />
              {/* <p className="">Hello</p> */}
            </SwiperSlide>
          ))}

          <div className="slider-controller">
            <div className="swiper-scrollbar"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Coaches;
