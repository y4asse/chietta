import UserPosts from '@/components/userPost/UserPosts'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import { getUserPosts } from '@/server/userPost/getUserPosts'

const UserPostsServer = async ({ id }: { id: string }) => {
  const { userPosts } = await getUserPosts(id)
  if (!userPosts) return notFound()
  return (
    <>
      {userPosts.length === 0 && (
        <div>
          <h2 className="text-center text-2xl font-bold mt-20">まだ記事の共有がありません</h2>
          <Image src={'/img/cat.png'} width={300} height={300} alt="cat" className="mx-auto" />
        </div>
      )}
      <UserPosts userPosts={userPosts} />
    </>
  )
}

export default UserPostsServer
