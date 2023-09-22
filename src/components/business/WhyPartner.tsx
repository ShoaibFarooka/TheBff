import React from "react";
import Image from "next/image";

import Base1 from "@/assets/Base feature icon.png";
import Base2 from "@/assets/Base feature icon (1).png";
import Base3 from "@/assets/Base feature icon (2).png";
import Base4 from "@/assets/Base feature icon (3).png";
import Base5 from "@/assets/Base feature icon (4).png";
import Base6 from "@/assets/Base feature icon (5).png";

// const comparison = [
//     { title: "Robust Woekflow", content: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eratnibh tristique ipsum.", image: Base1 },
//     { title: "Flexibility", content: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eratnibh tristique ipsum.", image: Base2 },
//     { title: "User friendly", content: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eratnibh tristique ipsum.", image: Base3 },
//     { title: "Multiple layouts", content: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eratnibh tristique ipsum.", image: Base4 },
//     { title: "Better components", content: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eratnibh tristique ipsum.", image: Base5 },
//     { title: "Well organised", content: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eratnibh tristique ipsum.", image: Base6 },

//   ];

export default function WhyPartner({ partnerWithUs }: { partnerWithUs?: any }) {
  return (
    <div>
      <div className="md:px-36 py-20 grid grid-cols-1 md:grid-cols-3 gap-28">
        {partnerWithUs?.map((c?: any, index?: any) => (
          <div
            key={index}
            className="hover:shadow-[0px_0px_5px_4px_rgb(0,0,0,0.3)] hover:duration-300 cursor-pointer hover:shadow-gray-500 p-2"
          >
            <div className="flex justify-center">
              <Image src={c.image} alt="" width={25} height={25} />
            </div>
            <p className="text-[30px] font-bold text-center text-white">
              {c.title}
            </p>
            <p className="text-[#C2C2C2] text-center">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
