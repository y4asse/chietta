'use client'

import React from 'react'
import UserPostItem from './UserPostItem'
import { useAtom } from 'jotai'
import { likeAtom } from '@/jotai/likeAtom'
import { UserPostsType } from '@/server/userPost/getUserPosts'

const UserPosts = ({ userPosts }: { userPosts: NonNullable<UserPostsType> }) => {
  const [likes] = useAtom(likeAtom)
  return (
    <div className="flex mx-auto flex-wrap max-w-[800px] px-3">
      {userPosts.map((item) => {
        const defaultLiked = likes.length > 0 ? likes.includes(item.id) : false
        return <UserPostItem key={item.id} userPost={item} defaultLiked={defaultLiked} />
      })}
    </div>
  )
}

export default UserPosts
