import { getFollowingUserPosts } from '@/app/posts/_actions/actions'
import WrapContainer from '@/components/layout/WrapContainer'
import UserPosts from '@/components/userPost/UserPosts'
import { authOptions } from '@/server/auth'
import { getServerSession } from 'next-auth'
import NoContent from '../noContent/NoContent'

const UserPostsServer = async () => {
  const session = await getServerSession(authOptions)
  const { userPosts, error } = await getFollowingUserPosts(session!.user.id) //　エラー時nullが返る
  if (error || !userPosts) return <WrapContainer>エラーが発生しました</WrapContainer>
  if (userPosts.length === 0) return <NoContent text="フォローしているユーザの投稿がありません" />
  console.log(userPosts)
  return <UserPosts userPosts={userPosts} />
}

export default UserPostsServer
