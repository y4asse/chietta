import UserPosts from '@/components/userPost/UserPosts'
import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import React from 'react'

//このページもキャッシュしたい
const Post = async () => {
  const result = await db.userPost.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  })
  const userPosts = await addOgp(result, { allowNull: true })
  return (
    // <ScrollDetect type="userPosts" q="">
    <UserPosts userPosts={userPosts} />
    // </ScrollDetect>
  )
}

export default Post
