import { UserActivitis } from '@/server/timeline/getUserActivities'
import UserIcon from '../utils/UserIcon'
import Link from 'next/link'
import PostLink from '../tech/PostLink'
import { calcDiffTime } from '@/utils/calcDiffTime'
import { FaRegBookmark } from 'react-icons/fa'
import Article from './Article'

type Props = {
  bookmark: NonNullable<NonNullable<UserActivitis>[number]['bookmark']>
  user: NonNullable<NonNullable<UserActivitis>[number]['user']>
}

const BookmarkActivity = ({ bookmark, user }: Props) => {
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
          さんがブックマークしました
          <FaRegBookmark className="inline ml-2" />
          <div className="text-gray">{calcDiffTime(bookmark.createdAt.toString())}</div>
        </div>
        <Article url={bookmark.entry.url} image={bookmark.entry.image} title={bookmark.entry.title} />
      </div>
    </>
  )
}

export default BookmarkActivity
