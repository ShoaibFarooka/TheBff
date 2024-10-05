import Image from "next/image";
import React from "react";

type GalleryProps = {
  images: { title: string, url: string }[]
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className="px-4 md:px-8 lg:px-12 mb-20 mt-20">
      <div className="rounded-3xl bg-gradient-to-r from-[#4A2F70] to-[#344363] px-3 md:px-10 py-5 md:py-10">
        <div className="text-white ">
          <p className="my-5 text-center font-semibold text-[30px] lg:text-[64px]">
            Unlimited variety
          </p>
          <p className="my-5 text-center">Unlimited variety</p>
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-3 md:gap-10 p-10">
              {images?.map((image, index?: any) => (
                <div
                  key={`gallery-img-${index}`}
                  className="relative max-w-max max-h-max rounded-3xl"
                >
                  <Image
                    className="rounded-3xl"
                    src={image.url}
                    alt=""
                    height={500}
                    width={500}
                  />

                  {/* Title */}
                  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/30 rounded-3xl">
                    <p className="text-white text-2xl font-semibold"> {image.title} </p>
                  </div>
                </div>
              ))}

            </div>
          </div>
          <div className="flex justify-center my-10">
            <button className="rounded-xl px-10 py-2.5 font-semibold bg-blue-500 border-solid bg-opacity-100 border-gradient">
              Start training now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
