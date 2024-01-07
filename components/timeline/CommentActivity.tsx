import { UserActivitis } from '@/server/timeline/getUserActivities'
import UserIcon from '../utils/UserIcon'
import Link from 'next/link'
import PostLink from '../tech/PostLink'
import { calcDiffTime } from '@/utils/calcDiffTime'
import { FaRegComment } from 'react-icons/fa'

type Props = {
  entryComment: NonNullable<NonNullable<UserActivitis>[number]['entryComment']>
  user: NonNullable<NonNullable<UserActivitis>[number]['user']>
}

const CommentActivity = ({ entryComment, user }: Props) => {
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
          さんがエントリーにコメントしました
          <FaRegComment className="inline ml-2 text-comment" />
        </div>
        <Link
          href={`/entry/${encodeURIComponent(entryComment.entry.url)}`}
          className="mt-2 bg-[#f0f0f0] rounded-xl p-3 block hover:opacity-70"
        >
          <p>{entryComment.content}</p>
          <div className="text-gray mt-1">{calcDiffTime(entryComment.createdAt.toString())}</div>
        </Link>
        <div className="mt-2 border border-lightGray rounded-xl p-3 ">
          <Link href={`/entry/${encodeURIComponent(entryComment.entry.url)}`} className="font-bold hover:underline">
            {entryComment.entry.title}
          </Link>
          <p className="text-gray break-all">{entryComment.entry.url}</p>
          <div className="w-full max-w-[500px] mx-auto rounded-xl overflow-hidden my-3">
            <PostLink url={entryComment.entry.url} image={entryComment.entry.image} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CommentActivity
