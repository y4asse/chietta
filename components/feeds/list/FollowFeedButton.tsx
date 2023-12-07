'use client'

import { followingFeedAtom } from '@/jotai/followingFeedAtom'
import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import { createFollowFeed, deleteFollowFeed } from '@/app/feeds/list/_action/actions'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const FollowFeedButton = ({ feedId }: { feedId: string }) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isFollowed, setIsFollowed] = useState(false)
  const [followingFeed, setFollowingFeed] = useAtom(followingFeedAtom)
  useEffect(() => {
    if (!session) return
    const isFollowed = followingFeed.some((feed) => feed.id === feedId)
    setIsFollowed(isFollowed)
  }, [followingFeed])

  const handleClick = async () => {
    if (!session) {
      router.push('/login')
      return
    }
    setIsFollowed(!isFollowed)
    if (isFollowed) {
      const { result, error } = await deleteFollowFeed({ userId: session.user.id, feedId: feedId })
      if (error) {
        alert('エラーが発生しました')
        return
      }
      return
    }
    const { result, error } = await createFollowFeed({ userId: session.user.id, feedId: feedId })
    if (error) {
      alert('エラーが発生しました')
      return
    }
  }
  return (
    <button
      onClick={handleClick}
      className={` px-3 py-1 rounded-xl duration-200 border border-[#afafaf] transition-all ${
        isFollowed ? 'bg-primary text-[white]' : 'hover:bg-lightGray'
      }`}
    >
      {isFollowed ? 'フォロー中' : 'フォロー'}
    </button>
  )
}

export default FollowFeedButton
