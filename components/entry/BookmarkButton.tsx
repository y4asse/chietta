'use client'

import { bookmarkEntry, deleteBookmark } from '@/app/entry/[url]/_actions/actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaBook } from 'react-icons/fa'

const BookmarkButton = ({ entryId, defaultIsBookmark }: { entryId: string; defaultIsBookmark: boolean }) => {
  const [isBookmark, setIsBookmark] = useState(defaultIsBookmark)
  const router = useRouter()
  const handleClick = async () => {
    setIsBookmark((prev) => !prev)
    const { error } = isBookmark ? await deleteBookmark({ entryId }) : await bookmarkEntry({ entryId })
    if (error) {
      setIsBookmark((prev) => !prev)
      return alert('エラーが発生しました')
    }
    router.refresh()
  }
  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-1 px-3 py-1 rounded font-bold border ${
        isBookmark ? 'border-lightGray hover:bg-lightGray' : 'bg-primary text-[white]'
      }`}
    >
      <FaBook />
      {isBookmark ? 'ブックマーク中' : 'Chie ブックマークに追加'}
    </button>
  )
}

export default BookmarkButton
