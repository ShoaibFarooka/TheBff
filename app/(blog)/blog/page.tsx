import React from 'react'
import { getPosts } from '@/lib/hypgraph' 
import FeaturedBlogs from '@/components/blog/FeaturedBlogs' 
import { featuredPosts, posts } from '@/lib/constants'

const Blogs = async () => {

    // const [ featuredData , data ] = await Promise.all([
    //     getPosts({ featured: true }),
    //     getPosts(undefined, { last: 10, orderBy: 'createdAt_DESC' })
    // ])

    return (
        <div className="h-screen mt-32 px-4 md:px-16 lg:px-28 xl:px-36 py-8">
            <FeaturedBlogs posts={featuredPosts} />
        </div>
    )
}

export default Blogs

export const dynamic = "error"