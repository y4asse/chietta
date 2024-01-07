import { UserActivitis } from '@/server/timeline/getUserActivities'
import UserIcon from '../utils/UserIcon'
import Link from 'next/link'
import PostLink from '../tech/PostLink'
import { calcDiffTime } from '@/utils/calcDiffTime'

type Props = {
  follow: NonNullable<NonNullable<UserActivitis>[number]['follow']>
  user: NonNullable<NonNullable<UserActivitis>[number]['user']>
}

const FollowActivity = ({ follow, user }: Props) => {
  return (
    <>
      <div className="mr-2">
        {user.idCreatedByUser && <UserIcon image={user.image} idCreatedByUser={user.idCreatedByUser} />}
      </div>
      <div className="w-[calc(100%-58px)]">
        <div>
          <Link href={`/${user.idCreatedByUser}`} className="font-bold hover:underline">
            {user.name}
          </Link>
          さんが
          <wbr />
          <Link href={`/${follow.following_user.idCreatedByUser}`} className="font-bold hover:underline">
            {follow.following_user.name}
          </Link>
          さんをフォローしました
        </div>
        <div className="border border-lightGray bg-[white] rounded-xl flex p-3 my-3">
          <div className="mr-2">
            {follow.following_user.idCreatedByUser && (
              <UserIcon image={follow.following_user.image} idCreatedByUser={follow.following_user.idCreatedByUser} />
            )}
          </div>
          <div className="w-[calc(100%-58px)]">
            <div>
              <Link href={`/${follow.following_user.idCreatedByUser}`} className="font-bold hover:underline">
                {follow.following_user.name}
              </Link>
            </div>
            <div className="mt-1">{follow.following_user.introduction}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FollowActivity
