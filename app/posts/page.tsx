import WrapContainer from '@/components/layout/WrapContainer'
import UserPosts from '@/components/userPost/UserPosts'
import { PostsWithData } from '../api/userPost/route'
import React from 'react'
import { getUserPosts } from '@/server/getUserPosts'
import Error from 'next/error'

const Post = async () => {
  // 規模が小さい間はSSRの方がむしろよさそう？
  const userPosts = await getUserPosts() //　エラー時nullが返る
  if (!userPosts) return <WrapContainer>エラーが発生しました</WrapContainer>
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
