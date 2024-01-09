'use client'

import { createBookmarkByUrl, deleteBookmarkByUrl } from '@/app/_actions/actions'
import { bookmarkAtom } from '@/jotai/bookmarkAtom'
import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'

const BookmarkButton = ({ url }: { url: string }) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [bookmarking, setBookmarking] = useAtom(bookmarkAtom)
  const isBookmarked = bookmarking.some((item) => item.url === url)

  const handleClick = async () => {
    if (status === 'loading') return
    if (!session) {
      return router.push(`/login?callbackUrl=${process.env.NEXT_PUBLIC_FRONT_URL}/entry/${encodeURIComponent(url)}`)
    }
    if (isBookmarked) {
      setBookmarking((prev) => prev.filter((item) => item.url !== url))
    } else {
      setBookmarking((prev) => [...prev, { url }])
    }
    const { error } = isBookmarked ? await deleteBookmarkByUrl({ url }) : await createBookmarkByUrl({ url })
    if (error) {
      setBookmarking((prev) => prev.filter((item) => item.url !== url))
      return alert(error)
    }
  }
  return (
    <button
      onClick={handleClick}
      className={`text-2xl transition-all duration-200 ${isBookmarked ? 'text-bookmark' : ''}`}
    >
      {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  )
}

export default BookmarkButton
