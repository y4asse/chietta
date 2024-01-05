import { Bookmark, Entry } from '@prisma/client'
import Link from 'next/link'
import PostLink from '../tech/PostLink'
import BookmarkButton from './BookmarkButton'
import { authOptions } from '@/server/auth'
import { getServerSession } from 'next-auth'
import { EntryType } from '@/server/entry/getEntry'
import { FaUserLarge } from 'react-icons/fa6'
import { MdOpenInNew } from 'react-icons/md'

const EntryItem = async ({ entry, url }: { entry: NonNullable<EntryType>; url: string }) => {
  const session = await getServerSession(authOptions)
  if (!session) return
  const defaultIsBookmark = entry.Bookmark.some((item) => item.user_id === session.user.id)
  return (
    <div>
      <div className="flex flex-wrap gap-5">
        <div className="w-full md:w-[calc(100%_-_320px)]">
          <h1 className="text-xl font-bold">
            <Link href={url} className="hover:underline" target="_blank">
              {entry.title ? entry.title : url}
              <MdOpenInNew className="inline ml-1" />
            </Link>
          </h1>
          <p className="text-sm text-gray pt-1">{url}</p>
        </div>
        <div className="w-[300px] mx-auto overflow-hidden rounded-xl">
          {entry.image && <PostLink url={url} image_url={entry.image} />}
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
