"use client"
import React from 'react'
import Image, { StaticImageData } from "next/image";
import styles from "@/styles/Home.module.scss";
import Slider from "react-slick";
import type { Settings } from "react-slick";	
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Import Assets
import coach1 from "@/assets/kindpng_218182.png";
import coach2 from "@/assets/Frame 39.png";
import coach3 from "@/assets/Frame 40.png";

// const coches = [
//     { name: "Gurpreet Singh", title: "E-REPS", image: coach1 },
//     { name: " Arman", title: "E-REPS", image: coach2 },
//     { name: "Birjot", title: "E-REPS", image: coach3 },
//     { name: "Gurpreet Singh", title: "E-REPS", image: coach1 },
//     { name: "Arman", title: "E-REPS", image: coach2 },
//     { name: "Birjot", title: "E-REPS", image: coach3 },
//     { name: "Gurpreet Singh", title: "E-REPS", image: coach1 },
//     { name: "Arman", title: "E-REPS", image: coach2 },
//     { name: "Birjot", title: "E-REPS", image: coach3 },
//     { name: "Gurpreet Singh", title: "E-REPS", image: coach1 },
//     { name: "Arman", title: "E-REPS", image: coach2 },
//     { name: "Birjot", title: "E-REPS", image: coach3 },
// ]


// ===================== {Coach} =====================
const Coach = ({ image, name, title } : { image: StaticImageData | string, name: string, title?: string }) => {

    return <div className="flex-shrink-0 text-white mb-14 center flex-col">
      <Image
        className="md:h-[431px] object-cover hover:scale-105 duration-300 mb-3 mx-auto "
        src={image}
        alt="/"
        width = {280}
                height={1000}
      />
  
      <p className="text-center"> { name } </p>
      {
        title && <p className="text-center"> { title } </p>
      }
    </div>
}
  
	
const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    // autoplaySpeed: 2000,
    arrows: false,
    dotsClass: styles.dots,
    swipeToSlide: true,
    
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            },
        },
    ]
};



const Coaches = ({ coaches }: { coaches?: any }) => {
    console.log(coaches)
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        // keep scrolling to the right
        const interval = setInterval(() => {
            if (ref.current) {
                ref.current.scrollLeft += 50;
            }
            }
        , 50);
        return () => clearInterval(interval);
    }, []);

  return (
    <div className="mb-10 sm:px-[100px] sm:py-[60px] px-[40px] py-[20px]">
        <div className="text-2xl sm:text-[50px]  ">
          <p className="sm:mb-8 lg:mb-10 text-[#AFCCF8]  font-[600] text-center">
            Relax your body and mind
          </p>
          <p className="text-[#F2BD4D] font-[600] text-center sm:mb-12 ">
            With your yoga coaches
          </p>
        </div>

        <div >

            <Slider {...settings} className=''>
                {
                    coaches?.map((coach? :any, index? :any) => (
                        <Coach key={'coach-' + index} image={coach.image} name={coach.name} title={coach.title} />
                    ))
                }
            </Slider>

        </div>
      </div>

  )
}

export default Coaches