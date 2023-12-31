import { getFollowingUserPosts } from '@/app/timeline/_actions/actions'
import WrapContainer from '@/components/layout/WrapContainer'
import UserPosts from '@/components/userPost/UserPosts'
import { authOptions } from '@/server/auth'
import { getServerSession } from 'next-auth'
import NoContent from '../error/NoContent'

const UserPostsServer = async () => {
  const session = await getServerSession(authOptions)
  const { userPosts, error } = await getFollowingUserPosts(session!.user.id)
  if (error || !userPosts) return <WrapContainer>エラーが発生しました</WrapContainer>
  if (userPosts.length === 0) return <NoContent text="フォローしているユーザの投稿がありません" />
  return <UserPosts userPosts={userPosts} />
}

export default UserPostsServer
