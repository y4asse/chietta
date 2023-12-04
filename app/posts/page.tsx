import WrapContainer from '@/components/layout/WrapContainer'
import UserPosts from '@/components/userPost/UserPosts'
import { PostsWithData } from '../api/userPost/route'
import React from 'react'

const Post = async () => {
  // 規模が小さい間はSSRの方がむしろよさそう？
  const revalidate = 0
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userPost`, {
    next: { revalidate }
  })
  if (!res.ok) {
    return <WrapContainer>error</WrapContainer>
  }
  const userPosts = (await res.json()) as PostsWithData
  return (
    // <ScrollDetect type="userPosts" q="">
    <>
      <h1 className="text-center text-3xl font-bold my-5">タイムライン</h1>
      <UserPosts userPosts={userPosts} />
    </>
    // </ScrollDetect>
  )
}

export default Post
