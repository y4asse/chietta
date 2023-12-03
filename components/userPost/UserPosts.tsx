'use client'

import React from 'react'
import UserPostItem from './UserPostItem'
import { PostsWithData } from '@/app/api/userPost/route'

const UserPosts = ({ userPosts }: { userPosts: PostsWithData }) => {
  return (
    <div className="flex mx-auto flex-wrap max-w-[800px] px-3">
      {userPosts.map((item) => {
        return <UserPostItem key={item.id} userPost={item} />
      })}
    </div>
  )
}

export default UserPosts
