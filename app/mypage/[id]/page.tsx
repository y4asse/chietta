import WrapContainer from '@/components/layout/WrapContainer'
import Profile from '@/components/mypage/Profile'
import UserPostItem from '@/components/userPost/UserPostItem'
import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { notFound } from 'next/navigation'
import React from 'react'

const Mypage = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const user = await db.user.findUnique({
    where: { id },
    include: { UserPost: true }
  })
  if (!user) return notFound()
  const posts = user.UserPost
  const postsWithOgp = await addOgp(posts)
  return (
    <WrapContainer>
      <div className="flex flex-wrap pt-10">
        <Profile user={user} />
        <div className="w-full">
          {postsWithOgp.map((post) => {
            const userPost = {
              user: user,
              ...post
            }
            return <UserPostItem key={post.id} userPost={userPost} />
          })}
          Pr
        </div>
      </div>
    </WrapContainer>
  )
}

export default Mypage
