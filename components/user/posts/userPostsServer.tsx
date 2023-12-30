import UserPosts from '@/components/userPost/UserPosts'
import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import React from 'react'

const UserPostsServer = async ({ id }: { id: string }) => {
  const posts = await db.userPost.findMany({
    where: {
      user: {
        idCreatedByUser: id
      }
    },
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
  const postsWithOgp = await addOgp(posts)
  return (
    <>
      {postsWithOgp.length === 0 && (
        <div>
          <h2 className="text-center text-2xl font-bold mt-20">まだ記事の共有がありません</h2>
          <Image src={'/img/cat.png'} width={300} height={300} alt="cat" className="mx-auto" />
        </div>
      )}
      <UserPosts userPosts={postsWithOgp} />
    </>
  )
}

export default UserPostsServer
