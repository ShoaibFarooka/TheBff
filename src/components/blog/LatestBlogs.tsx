"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import type { Post } from "../../types/blog";
export default function LatestBlogs({ posts }: { posts: Post[] }) {
  return (
    <div className="h-full w-full px-10">
      <h2 className="text-2xl text-white font-semibold mb-10">Latest Posts</h2>
      <div className="grid grid-cols-1  md:grid-cols-3 gap-10 h-full w-full">
        {posts?.length > 0 &&
          posts.map((post, index: number) => (
            <div
              className="h-full flex flex-col items-start p-3 md:py-5 rounded-md bg-gray-100 text-black shadow-2xl hover:shadow-orange-400/20 hover:scale-[1.02] duration-300 transition-all ease-in-out"
              key={"featured-post" + (index + 1)}
            >
              {/* href={`/blog/${post.slug}`} */}
              <Link href={`/blog/${post.slug}`}>
                <div className=" my-auto cursor-pointer">
                  <Image
                    src={post.coverImage.url}
                    alt={post?.title}
                    width={500}
                    height={500}
                    className="rounded-md min-w-full max-w-full"
                  />

                  <h3 className="text-xl text-gray-900 font-semibold my-2 line-clamp-2">
                    {post?.title}
                  </h3>
                  <p className="text-gray-700 my-2 text-sm line-clamp-3">
                    {post?.excerpt}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {post.createdAt &&
                      new Date(post.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                  </p>
                </div>
              </Link>

              {/* <div className="">
                    {/* Author */}
              {/* <div className="flex items-center mt-5">
                      <div className="flex flex-col">
                        <h4 className="text-base text-gray-900 font-semibold">
                          {post?.author?.name}
                        </h4>
                        <p className="text-sm text-gray-700">
                          {post?.author?.biography}
                        </p>
                      </div>
                    </div>
                  </div> */}
            </div>
          ))}
      </div>
    </div>
  );
}
