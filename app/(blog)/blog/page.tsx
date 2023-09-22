import React from "react";
import { getPosts } from "@/lib/hypgraph";
import FeaturedBlogs from "@/components/blog/FeaturedBlogs";
import LatestBlogs from "@/components/blog/LatestBlogs";

const Blogs = async () => {
  const data = await getPosts(undefined, {
    last: 15,
    orderBy: "createdAt_DESC",
  });

  const {
    posts,
    // postsConnection: {
    //   aggregate: { count },
    // },
  } = data;

  const featuredPosts = posts.filter((post) => post.featured);
  const latestPosts = posts.filter((post) => !post.featured);

  return (
    <div className="h-full mt-32 px-4 md:px-16 lg:px-28 xl:px-36 py-8">
      <FeaturedBlogs posts={featuredPosts} />

      {/* Create a component for latets posts */}
      <LatestBlogs posts={latestPosts} />
    </div>
  );
};

export default Blogs;

export const dynamic = "error";
