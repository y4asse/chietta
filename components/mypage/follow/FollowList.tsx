import ErrorComponent from '@/components/error/ErrorComponent'
import { getFollowersUser } from '@/server/follow/getFollowersUser'
import { getFollowingUser } from '@/server/follow/getFollowingUser'
import FollowItem from './FollowItem'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/server/auth'
import NoContent from '@/components/error/NoContent'

const FollowList = async ({ type, userName }: { type: 'following' | 'followers'; userName: string }) => {
  const session = await getServerSession(authOptions)
  //　そのページのユーザのフォロー一覧を取得
  const data = type === 'following' ? await getFollowingUser({ userName }) : await getFollowersUser({ userName })
  const sessionUserFollows = session
    ? session.user.idCreatedByUser
      ? await getFollowingUser({ userName: session.user.idCreatedByUser })
      : null
    : null
  if (!data) return <ErrorComponent />
  if (data.users.length === 0)
    return <NoContent text={type === 'following' ? 'フォロー中のユーザがいません' : 'フォロワーがいません'} />
  return (
    <div className="max-w-[1000px] px-3 mx-auto">
      <h1 className="text-center font-bold text-xl mt-5">{type === 'following' ? 'フォロー中' : 'フォロワー'}</h1>
      <div className="mt-10">
        {data.users.map((user, i) => {
          const defaultFollow = sessionUserFollows
            ? sessionUserFollows.users.some((item) => item.id === user.id)
            : false
          return <FollowItem key={i} user={user} defaultFollow={defaultFollow} />
        })}
      </div>
    </div>
  )
}

export default FollowList
