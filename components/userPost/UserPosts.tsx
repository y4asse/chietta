'use client'

import React from 'react'
import UserPostItem from './UserPostItem'
import { PostsWithData } from '@/app/api/userPost/route'
import { useLikes } from '@/hooks/useLikes'

const UserPosts = ({ userPosts }: { userPosts: PostsWithData }) => {
  const likes = useLikes()
  return (
    <div className="flex mx-auto flex-wrap max-w-[800px] px-3">
      {userPosts.map((item) => {
        const defaultLiked = likes.length > 0 ? likes.some((like) => like && like.user_post_id === item.id) : false
        return <UserPostItem key={item.id} userPost={item} defaultLiked={defaultLiked} />
      })}
    </div>
  )
}

export default UserPosts
