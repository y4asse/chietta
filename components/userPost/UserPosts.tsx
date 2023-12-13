'use client'

import React from 'react'
import UserPostItem from './UserPostItem'
import { PostsWithData } from '@/app/api/userPost/route'
import { useAtom } from 'jotai'
import { likeAtom } from '@/jotai/likeAtom'

const UserPosts = ({ userPosts }: { userPosts: PostsWithData }) => {
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
