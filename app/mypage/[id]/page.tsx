import WrapContainer from '@/components/layout/WrapContainer'
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
        <div className="items-center flex max-x-[800px] mx-auto gap-5 pb-10">
          <img src={user.image!} alt="ユーザアイコン" className="w-[200px] h-[200px] rounded-full" />
          <div>
            <span className="text-xl font-bold">{user.name}</span>
            <div>
              <button>Edit</button>
            </div>
          </div>
        </div>
        <div className="w-full">
          {postsWithOgp.map((post) => {
            const userPost = {
              user: user,
              ...post
            }
            return <UserPostItem key={post.id} userPost={userPost} />
          })}
        </div>
      </div>
    </WrapContainer>
  )
}

export default Mypage
