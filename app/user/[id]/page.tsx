import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { notFound } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import UserPosts from '@/components/userPost/UserPosts'

const Mypage = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const posts = await db.userPost.findMany({
    where: { user_id: id },
    include: {
      _count: {
        select: { like: true }
      },
      user: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (!posts) return notFound()
  const postsWithOgp = await addOgp(posts, { allowNull: true })
  return (
    <div className="w-full px-2">
      {postsWithOgp.length === 0 && (
        <div>
          <h2 className="text-center text-2xl font-bold mt-20">まだ記事の共有がありません</h2>
          <Image src={'/img/cat.png'} width={300} height={300} alt="cat" className="mx-auto" />
        </div>
      )}
      <UserPosts userPosts={postsWithOgp} />
    </div>
  )
}

export default Mypage
