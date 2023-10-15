import React from 'react'
import PostItem from './PostItem'
import { ReturnPost } from '@/app/api/post/route'

const Posts = ({ posts }: { posts: ReturnPost[] }) => {
  return (
    <div className="flex mx-auto flex-wrap p-5  gap-10 max-w-[800px] mt-10">
      {posts.map((post) => (
        <PostItem post={post} key={crypto.randomUUID()} />
      ))}
    </div>
  )
}

export default Posts
