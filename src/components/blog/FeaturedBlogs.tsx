"use client";
import React from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types/blog";

// Swiper CSS
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const FeaturedBlogs = ({ posts }: { posts: Post[] }) => {
  const ref = React.useRef<SwiperRef>(null);

  return (
    posts?.length && (
      <div className="mb-10">
        <h2 className="text-2xl text-white font-semibold mb-10">
          Featured Posts
        </h2>

        <div className="flex gap-x-1 md:gap-x-5">
          <div className="hidden md:flex flex-col justify-center items-center">
            <FaArrowCircleLeft
              size={30}
              onClick={() => ref.current?.swiper.slidePrev()}
              className="fill-white/30 hover:fill-purple-400 hover:text-white cursor-pointer"
            />
          </div>

          <Swiper
            ref={ref}
            loop
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              pauseOnMouseEnter: true,
            }}
            navigation={false}
            modules={[Navigation, Pagination, Autoplay]}
            // className="mySwiper"
          >
            {posts?.length > 0 &&
              posts.map((post, index: number) => (
                <SwiperSlide key={"slide-" + index} className="bg-transparent">
                  <Link href={`/blog/${post.slug}`}>
                    <div
                      className="mb-10 min-h-full flex flex-col flex-1 md:flex-row px-5 py-4 rounded-md bg-gray-100 text-black"
                      key={"featured-post" + (index + 1)}
                    >
                      <div className=" w-full md:w-5/12 md:my-auto">
                        <Image
                          src={post.coverImage.url}
                          alt={post?.title}
                          width={1000}
                          height={1000}
                          className="rounded-md w-[100rem]"
                        />
                      </div>
                      <div className="w-full md:w-7/12 px-5 md:my-auto">
                        <h3 className="text-xl md:text-3xl text-gray-900 font-semibold mb-2">
                          {post?.title}
                        </h3>
                        <p className="text-gray-700 text-base">
                          {post?.excerpt}
                        </p>

                        <div className="">
                          {/* Author */}
                          <div className="flex items-center mt-5">
                            <div className="flex flex-col">
                              <h4 className="text-base text-gray-900 font-semibold">
                                {post?.author?.name}
                              </h4>
                              <p className="text-sm text-gray-700">
                                {post?.author?.biography}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}

            <div className="swiper-pagination"></div>
          </Swiper>

          <div className="hidden md:flex flex-col justify-center items-center">
            <FaArrowCircleRight
              size={30}
              onClick={() => ref.current?.swiper.slideNext()}
              className="fill-white/30 hover:fill-purple-400 hover:text-white cursor-pointer"
            />
          </div>
        </div>

        {/* <div className="flex flex-col justify-center items-center">
          <FaArrowCircleRight
            size={30}
            onClick={() => ref.current?.swiper.slideNext()}
            className="fill-white/30 hover:fill-purple-400 hover:text-white cursor-pointer"
          />
        </div> */}
        {/* </div> */}
      </div>
    )
  );
};

export default FeaturedBlogs;
