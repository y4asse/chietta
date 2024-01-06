import PostLink from '../tech/PostLink'
import BookmarkButton from './BookmarkButton'
import { authOptions } from '@/server/auth'
import { getServerSession } from 'next-auth'
import { EntryType } from '@/server/entry/getEntry'
import { FaUserLarge } from 'react-icons/fa6'
import EntryLink from './EntryLink'

const EntryItem = async ({ entry }: { entry: NonNullable<EntryType> }) => {
  const session = await getServerSession(authOptions)
  const defaultIsBookmark = entry.Bookmark.some((item) => item.user_id === session?.user.id)
  return (
    <div>
      <div className="flex flex-wrap gap-5">
        <div className="w-full md:w-[calc(100%_-_320px)]">
          <h1 className="text-xl font-bold">
            <EntryLink entry={entry} session={session} />
          </h1>
          <p className="text-sm text-gray pt-1">{entry.url}</p>
        </div>
        <div className="w-[300px] mx-auto overflow-hidden rounded-xl">
          {entry.image && <PostLink url={entry.url} image={entry.image} />}
        </div>
      </div>
      <div className="mt-5 flex items-center gap-5">
        <BookmarkButton session={session} entryId={entry.id} defaultIsBookmark={defaultIsBookmark} url={entry.url} />
        <div className="flex items-center gap-1 text-xl">
          <FaUserLarge /> {entry.Bookmark.length}
        </div>
      </div>
    </div>
  )
}

export default EntryItem
