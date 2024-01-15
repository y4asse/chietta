import BookmarkButton from './BookmarkButton'
import { authOptions } from '@/server/auth'
import { getServerSession } from 'next-auth'
import { EntryType } from '@/server/entry/getEntry'
import { FaUserLarge } from 'react-icons/fa6'
import EntryInfo from './EntryInfo'

const EntryItem = async ({ entry }: { entry: NonNullable<EntryType> }) => {
  const session = await getServerSession(authOptions)
  const defaultIsBookmark = entry.Bookmark.some((item) => item.user_id === session?.user.id)
  return (
    <div>
      <EntryInfo url={entry.url} title={entry.title} image={entry.image} />
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
