import Link from 'next/link'
import PostLink from '../tech/PostLink'
import BookmarkButton from './BookmarkButton'
import { authOptions } from '@/server/auth'
import { getServerSession } from 'next-auth'
import { EntryType } from '@/server/entry/getEntry'
import { FaUserLarge } from 'react-icons/fa6'
import { MdOpenInNew } from 'react-icons/md'

const EntryItem = async ({ entry }: { entry: NonNullable<EntryType> }) => {
  const session = await getServerSession(authOptions)
  const defaultIsBookmark = entry.Bookmark.some((item) => item.user_id === session?.user.id)
  return (
    <div>
      <div className="flex flex-wrap gap-5">
        <div className="w-full md:w-[calc(100%_-_320px)]">
          <h1 className="text-xl font-bold">
            <Link href={entry.url} className="hover:underline" target="_blank">
              {entry.title ? entry.title : entry.url}
              <MdOpenInNew className="inline ml-1" />
            </Link>
          </h1>
          <p className="text-sm text-gray pt-1">{entry.url}</p>
        </div>
        <div className="w-[300px] mx-auto overflow-hidden rounded-xl">
          {entry.image && <PostLink url={entry.url} image_url={entry.image} />}
        </div>
      </div>
      <div className="mt-5 flex items-center gap-5">
        <BookmarkButton entryId={entry.id} defaultIsBookmark={defaultIsBookmark} />
        <div className="flex items-center gap-1 text-xl">
          <FaUserLarge /> {entry.Bookmark.length}
        </div>
      </div>
    </div>
  )
}

export default EntryItem
