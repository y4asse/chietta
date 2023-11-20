import { authOptions } from '@/server/auth'
import Profile from '@/components/mypage/Profile'
import UserPostItem from '@/components/userPost/UserPostItem'
import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import React from 'react'

const Mypage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions)
  const sessionUser = session ? session.user : null
  const { id } = params
  const user = await db.user.findUnique({
    where: { id },
    include: {
      UserPost: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })
  if (!user) return notFound()
  const posts = user.UserPost
  const postsWithOgp = await addOgp(posts, { allowNull: true })
  return (
    <div className="flex flex-wrap pt-10">
      <Profile user={user} sessionUser={sessionUser} />
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
    </div>
  )
}

export default Mypage
