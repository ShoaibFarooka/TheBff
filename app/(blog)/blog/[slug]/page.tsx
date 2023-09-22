// "use client"
import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/hypgraph";

import { RichText } from "@graphcms/rich-text-react-renderer";
import Link from "next/link";

const Blog = async ({ params }: { params: { slug: string } }) => {
  const targetSlug = params.slug;

  const post = await getPost(targetSlug);
  if (!post) return notFound();

  return (
    <div className="text-white mt-24 px-10 md:px-32">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:w-1/2">
          <h1 className="text-3xl font-semibold">{post?.title}</h1>
          {/* <h1>{params.slug}</h1> */}
          <p className="text-lg text-gray-300 my-5">{post?.excerpt}</p>
          <p className="text-xs text-gray-400">
            <span>{post?.author?.name}</span>
            <span>
              {post.createdAt &&
                new Date(post.createdAt).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
            </span>
          </p>
        </div>
        <div className="md:w-1/2 md:pl-5">
          <Image
            src={post?.coverImage?.url}
            width={500}
            height={500}
            alt=""
            className="rounded-lg my-5 md:py-0 min-w-full max-w-full shadow-2xl shadow-yellow-700/5"
          />
        </div>
      </div>
      <div className="md:w-4/5 mx-auto mb-10">
        {/* <p>{post?.content.raw}</p> */}
        <RichText
          content={post?.content?.raw}
          renderers={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-semibold pt-6">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold pt-6 pb-2">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold pt-6 pb-2 text-gray-100">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-lg font-semibold pt-4 pb-2 text-gray-100">
                {children}
              </h4>
            ),
            h5: ({ children }) => (
              <h5 className="text-md font-semibold pt-4 pb-2 text-gray-200">
                {children}
              </h5>
            ),
            h6: ({ children }) => (
              <h6 className="text-base font-semibold pt-4 pb-2 text-gray-200">
                {children}
              </h6>
            ),
            p: ({ children }) => (
              <p className="text-justify font-normal whitespace-pre-line pt-1 text-gray-200">
                {children}
              </p>
            ),
            a: ({ href, children }) => (
              <Link
                href={href!}
                className="text-blue-700 hover:bg-blue-600 px-1 rounded-sm hover:text-white underline-offset-4"
                target={href?.startsWith("/") ? undefined : "_blank"}
              >
                {children}
              </Link>
            ),
            img: ({ src, altText }) => (
              <Image
                src={src!}
                width={500}
                height={500}
                alt={altText!}
                className="max-w-full my-5 rounded mx-auto shadow-2xl shadow-yellow-700/5"
              />
            ),
            iframe: ({ url }) => (
              <iframe
                src={url}
                className="w-full max-h-[30rem] min-h-[12rem] md:min-h-[24rem] my-5"
                // allowFullScreen
              ></iframe>
            ),
            blockquote: ({ children }) => (
              <blockquote className="text-justify">{children}</blockquote>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-4">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-4">{children}</ol>
            ),
            li: ({ children }) => <li className="text-justify">{children}</li>,
            table: ({ children }) => (
              <table className="table-auto border border-collapse">
                {children}
              </table>
            ),
            table_head: ({ children }) => (
              <thead className="border bg-slate-500">{children}</thead>
            ),
            table_body: ({ children }) => (
              <tbody className="border">{children}</tbody>
            ),
            table_row: ({ children }) => <tr className="border">{children}</tr>,
            table_cell: ({ children }) => (
              <td className="border text-center px-2">{children}</td>
            ),
            table_header_cell: ({ children }) => (
              <th className="border text-white text-center text-lg px-2">
                {children}
              </th>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default Blog;
