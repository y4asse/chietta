'use client'

import { bookmarkEntry, deleteBookmark } from '@/app/entry/[url]/_actions/actions'
import { bookmarkAtom } from '@/jotai/bookmarkAtom'
import { useAtom } from 'jotai'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaBookmark } from 'react-icons/fa'

const BookmarkButton = ({
  entryId,
  url,
  defaultIsBookmark,
  session
}: {
  entryId: string
  url: string
  defaultIsBookmark: boolean
  session: Session | null
}) => {
  const [, setBookmarking] = useAtom(bookmarkAtom)
  const [isBookmark, setIsBookmark] = useState(defaultIsBookmark)
  const router = useRouter()
  const handleClick = async () => {
    if (!session)
      return router.push(`/login?callbackUrl=${process.env.NEXT_PUBLIC_FRONT_URL}/entry/${encodeURIComponent(url)}`)
    setIsBookmark((prev) => !prev)
    if (isBookmark) {
      setBookmarking((prev) => prev.filter((item) => item.url !== url))
    } else {
      setBookmarking((prev) => [...prev, { url }])
    }
    const { error } = isBookmark ? await deleteBookmark({ entryId }) : await bookmarkEntry({ entryId })
    if (error) {
      setIsBookmark((prev) => !prev)
      setBookmarking((prev) => prev.filter((item) => item.url !== url))
      return alert('エラーが発生しました')
    }
    router.refresh()
  }
  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-1 px-3 py-1 rounded font-bold border dark:border-dark transition-all duration-200 ${
        isBookmark ? 'border-lightGray hover:bg-lightGray dark:hover:bg-gray' : 'bg-primary text-white'
      }`}
    >
      <FaBookmark />
      {isBookmark ? 'ブックマーク中' : 'Chie ブックマークに追加'}
    </button>
  )
}

export default BookmarkButton
