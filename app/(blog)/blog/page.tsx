import React from 'react'
import { getPosts } from '@/lib/hypgraph' 
import FeaturedBlogs from '@/components/blog/FeaturedBlogs' 
import { featuredPosts, posts } from '@/lib/constants'
import LatestBlogs from '@/components/blog/LatestBlogs'
const Blogs = async () => {

    // const [ featuredData , data ] = await Promise.all([
    //     getPosts({ featured: true }),
    //     getPosts(undefined, { last: 10, orderBy: 'createdAt_DESC' })
    // ])

    return (
        <div className="h-full mt-32 px-4 md:px-16 lg:px-28 xl:px-36 py-8">
            
            <FeaturedBlogs posts={featuredPosts} />
            

            {/* Create a component for latets posts */}
            <LatestBlogs posts = {posts}/>
            
        </div>
    )
}

export default Blogs

export const dynamic = "error"