import React from 'react'
import UserPostItem, { UserPostsWithImage } from './UserPostItem'
import { WithImageUrl } from '@/server/addOgp'
import { User, UserPost } from '@prisma/client'

export type WithUser<T> = T & { user: User }

const UserPosts = ({ userPosts }: { userPosts: WithImageUrl<WithUser<UserPost>>[] }) => {
  return (
    <div className="flex mx-auto flex-wrap max-w-[800px]">
      {userPosts.map((item) => {
        return <UserPostItem key={item.id} userPost={item} />
      })}
    </div>
  )
}

export default UserPosts
