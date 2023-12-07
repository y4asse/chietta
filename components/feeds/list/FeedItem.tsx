'use client'

import { createFollowFeed, deleteFollowFeed } from '@/app/feeds/list/_action/actions'
import { followingFeedAtom } from '@/jotai/followingFeedAtom'
import { Feed } from '@prisma/client'
import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const FeedItem = ({ item }: { item: Feed }) => {
  const [isFollowed, setIsFollowed] = useState(false)
  const [followingFeed, setFollowingFeed] = useAtom(followingFeedAtom)
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (!session) return
    const isFollowed = followingFeed.some((feed) => feed.id === item.id)
    setIsFollowed(isFollowed)
  }, [followingFeed])

  const handleClick = async () => {
    if (!session) {
      router.push('/login')
      return
    }
    setIsFollowed(!isFollowed)
    if (isFollowed) {
      const { result, error } = await deleteFollowFeed({ userId: session.user.id, feedId: item.id })
      if (error) {
        alert('エラーが発生しました')
        return
      }
      return
    }
    const { result, error } = await createFollowFeed({ userId: session.user.id, feedId: item.id })
    if (error) {
      alert('エラーが発生しました')
      return
    }
  }
  return (
    <div className="border border-[#afafaf] rounded p-3 bg-[white]">
      <Link href={`/feeds/${item.id}`} className="hover:underline text-xl font-semibold">
        {item.name}
      </Link>
      <p className="text-gray break-words">{item.feedUrl}</p>
      <div className="text-right">
        <button
          onClick={handleClick}
          className={` px-3 py-1 rounded-xl duration-200 border border-[#afafaf] transition-all ${
            isFollowed ? 'bg-primary text-[white]' : 'hover:bg-lightGray'
          }`}
        >
          {isFollowed ? 'フォロー中' : 'フォロー'}
        </button>
      </div>
    </div>
  )
}

export default FeedItem
