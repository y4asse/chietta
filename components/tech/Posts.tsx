'use client'

import React from 'react'
import PostItem from './PostItem'
import { motion } from 'framer-motion'
import { PostItemType } from '@/types/postItem'

const Posts = ({ posts }: { posts: PostItemType[] }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex mx-auto flex-wrap p-5 gap-10 max-w-[800px]">
        {posts.map((post) => (
          <PostItem post={post} key={post.url} />
        ))}
        {posts.length % 2 === 1 && <div className="w-[340px] h-0" />}
      </div>
    </motion.div>
  )
}

export default Posts
