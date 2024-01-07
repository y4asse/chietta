import { UserActivitis } from '@/server/timeline/getUserActivities'
import UserIcon from '../utils/UserIcon'
import Link from 'next/link'
import PostLink from '../tech/PostLink'
import { calcDiffTime } from '@/utils/calcDiffTime'
import PostItem from '../tech/PostItem'
import { FaRegBookmark } from 'react-icons/fa'

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
        <div className="mt-2 border border-lightGray rounded-xl p-3 ">
          <Link href={`/entry/${encodeURIComponent(bookmark.entry.url)}`} className="font-bold hover:underline">
            {bookmark.entry.title}
          </Link>
          <p className="text-gray break-all">{bookmark.entry.url}</p>
          <div className="w-full max-w-[500px] mx-auto rounded-xl overflow-hidden my-3">
            <PostLink url={bookmark.entry.url} image={bookmark.entry.image} />
          </div>
        </div>
      </div>
    </>
  )
}

export default BookmarkActivity
