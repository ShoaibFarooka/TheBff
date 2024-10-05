"use client";
import type { Post } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import carouselAutoplay from 'embla-carousel-autoplay';


const FeaturedBlogs = ({ posts }: { posts: Post[] }) => {

  return (
    posts?.length && (
      <div className="mb-10">
        <h2 className="text-2xl text-white font-semibold mb-10">
          Featured Posts
        </h2>

        <div className="mx-auto">
          <Carousel
            opts={{
              loop: true,
            }}
            placeholder="Loading..."
            plugins={[
              carouselAutoplay({
                delay: 3000
              })
            ]}
            className="max-w-5xl mx-auto"
          >
            <CarouselNext className="bg-neutral-50 text-neutral-700 hover:opacity-90" />
            <CarouselPrevious className="bg-neutral-50 text-neutral-700 hover:opacity-90" />

            <CarouselContent>
              {posts.map((post, index) => (
                <CarouselItem key={"featured-post" + (index + 1)}>
                  <Link href={`/blog/${post.slug}`}>
                    <div
                      className="mb-10 min-h-full flex flex-col flex-1 md:flex-row px-5 py-4 rounded-md bg-gray-100 text-black"
                    >
                      <div className=" w-full md:w-5/12 md:my-auto">
                        <Image
                          src={post.coverImage.url}
                          alt={post?.title}
                          width={1000}
                          height={1000}
                          className="rounded-md w-[100rem] h-64 md:h-80"
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
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
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
