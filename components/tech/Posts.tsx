'use client'

import React from 'react'
import PostItem from './PostItem'
import { motion } from 'framer-motion'

const Posts = ({ posts }: { posts: PostItem[] }) => {
  if (posts.length === 0) return <></>
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex mx-auto flex-wrap p-5 gap-10 max-w-[800px]"
    >
      {posts.map((post) => (
        <PostItem post={post} key={post.url} />
      ))}
    </motion.div>
  )
}

export default Posts
