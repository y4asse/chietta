import UserPosts from '@/components/userPost/UserPosts'
import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import React from 'react'

const Post = async () => {
  const result = await db.userPost.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  })
  const userPosts = await addOgp(result)
  return (
    // <ScrollDetect type="userPosts" q="">
    <UserPosts userPosts={userPosts} />
    // </ScrollDetect>
  )
}

export default Post
