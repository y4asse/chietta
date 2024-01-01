import Link from 'next/link'
import FollowButton from '../FollowButton'
import { authOptions } from '@/server/auth'
import { getServerSession } from 'next-auth'

type Props = {
  user: {
    name: string
    idCreatedByUser: string | null
    image: string | null
    introduction: string | null
    id: string
  }
  defaultFollow: boolean
}
const FollowItem = async ({ user, defaultFollow }: Props) => {
  const session = await getServerSession(authOptions)
  if (!session) return
  return (
    <div className="flex mt-3 p-5 shadow rounded">
      <div className="min-w-[100px]">
        <Link href={`/${user.idCreatedByUser}`} className="hover:opacity-70">
          <img
            src={user.image ? user.image : ''}
            alt="ユーザアイコン"
            className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-full mx-auto border border-[#afafaf]"
          />
        </Link>
      </div>
      <div className="flex-grow">
        <Link href={`/${user.idCreatedByUser}`} className="font-bold hover:underline">
          {user.name}
        </Link>
        <p className="text-gray">{user.introduction}</p>
      </div>
      <div className="min-w-[100px] text-end">
        <FollowButton userId={user.id} sessionUserId={session.user.id} defaultFollow={defaultFollow} />
      </div>
    </div>
  )
}

export default FollowItem
