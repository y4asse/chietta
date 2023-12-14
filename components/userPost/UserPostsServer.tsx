import WrapContainer from '@/components/layout/WrapContainer'
import UserPosts from '@/components/userPost/UserPosts'
import { getUserPosts } from '@/server/getUserPosts'

const UserPostsServer = async () => {
  const userPosts = await getUserPosts() //　エラー時nullが返る
  if (!userPosts) return <WrapContainer>エラーが発生しました</WrapContainer>
  return <UserPosts userPosts={userPosts} />
}

export default UserPostsServer
