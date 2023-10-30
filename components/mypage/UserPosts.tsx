'use client'

import { WithImageUrl } from '@/server/addOgp'
import { User, UserPost } from '@prisma/client'
import UserPostItem from '../userPost/UserPostItem'

const UserPosts = ({ postsWithOgp, user }: { postsWithOgp: WithImageUrl<UserPost>[]; user: User }) => {
  return (
    <div className="w-full">
      {postsWithOgp.length === 0 && <h2 className="text-center text-2xl font-bold">まだ記事の共有がありません</h2>}
      {postsWithOgp.map((post) => {
        const userPost = {
          user: user,
          ...post
        }
        return <UserPostItem key={post.id} userPost={userPost} />
      })}
    </div>
  )
}

export default UserPosts
