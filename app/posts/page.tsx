import WrapContainer from '@/components/layout/WrapContainer'
import UserPosts, { WithUser } from '@/components/userPost/UserPosts'
import { WithImageUrl } from '@/server/addOgp'
import { UserPost } from '@prisma/client'
import React from 'react'

const Post = async () => {
  // 規模が小さい間はSSRの方がむしろよさそう？
  const revalidate = 0 // 5分ごとに再生成
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userPost`, {
    // next: { revalidate } // 5分ごとに再生成
    cache: 'no-cache'
  }).catch((err) => {
    return null
  })
  if (!res) return <WrapContainer>error</WrapContainer>
  const userPosts = (await res.json()) as WithImageUrl<WithUser<UserPost>>[]
  return (
    // <ScrollDetect type="userPosts" q="">
    <UserPosts userPosts={userPosts} />
    // </ScrollDetect>
  )
}

export default Post
