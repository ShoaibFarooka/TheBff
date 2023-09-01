// "use client"
import React from 'react'
import { useRouter } from 'next/router';
import { Post } from '@/types/blog';
import Image from 'next/image';
import {  posts } from '@/lib/constants'
const Blog = () => {

  return (
    <div className='text-white mt-24 px-10 md:px-32'> 
      <div className='flex flex-col md:flex-row  justify-between'>
        <div className='md:w-1/2'>
            <h1 className='text-3xl font-semibold'>
         {posts[0].title}
          </h1>
          <p className='text-lg text-gray-400 my-5'>
          {posts[0].excerpt}
          </p>
          <p className='text-xs text-gray-600'>
            <span>{posts[0].author.name}</span>
            <span>Aug 24, 2023</span>
            </p>  
        </div>
        <div className='md:w-1/3'>
          <Image src = {posts[0].coverImage.url}  width={300}
                    height={200}  alt = "" className='rounded-lg my-5 md:py-0' />

        </div>

      </div>
      <div className=''>
        <p>{posts[0].content.raw}</p>
      </div>
     
    
    </div>
  )
}

export default Blog