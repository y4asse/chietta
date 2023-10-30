'use client'
import { WithImageUrl } from '@/server/addOgp'
import { User, UserPost } from '@prisma/client'
import Profile from './Profile'
import UserPosts from './UserPosts'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getUser } from '@/server/getUser'

// 自分のページだったときrevalidate0で最新の情報を取得し直してStateを更新する
const MypageClient = ({ postsWithOgp, user }: { postsWithOgp: WithImageUrl<UserPost>[]; user: User }) => {
  const { data: sesson } = useSession()
  const sessionUser = sesson ? sesson.user : null
  const isMine = sessionUser && sessionUser.id === user.id
  const [posts, setPosts] = useState<WithImageUrl<UserPost>[]>(postsWithOgp)
  const [userState, setUserState] = useState<User>(user)
  useEffect(() => {
    if (isMine) {
      const revalidate = 0
      getUser(user.id, revalidate).then((res) => {
        const resUser = res?.user
        const resPosts = res?.postsWithOgp
        if (resUser) {
          setUserState(resUser)
        }
        if (resPosts) {
          setPosts(resPosts)
        }
      })
    }
  }, [isMine])
  if (!user) return
  return (
    <>
      <Profile user={userState} />
      <UserPosts postsWithOgp={posts} user={user} />
    </>
  )
}

export default MypageClient
