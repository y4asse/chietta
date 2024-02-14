'use client'

import { followUser, unfollowUser } from '@/app/[id]/_actions/actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const FollowButton = ({
  userId,
  sessionUserId,
  defaultFollow
}: {
  userId: string
  sessionUserId: string
  defaultFollow: boolean
}) => {
  const [isFollow, setIsFollow] = useState(defaultFollow)
  const router = useRouter()
  if (userId === sessionUserId) return
  const handleClick = async () => {
    if (isFollow) {
      setIsFollow(false)
      const { result, error } = await unfollowUser({ followingUserId: userId })
      if (error) {
        setIsFollow(true)
      }
    } else {
      setIsFollow(true)
      const { result, error } = await followUser({ followingUserId: userId })
      if (error) {
        setIsFollow(false)
      }
    }
    router.refresh()
  }
  return (
    <button
      onClick={handleClick}
      className={`rounded  px-3 py-1 font-semibold border transition-all duration-200 text-sm md:text-base ${
        isFollow
          ? 'bg-white dark:bg-dark border-lightGray dark:border-dark hover:bg-lightGray dark:hover:bg-gray'
          : 'bg-primary text-white dark:border-none'
      }`}
    >
      {isFollow ? 'フォロー中' : 'フォローする'}
    </button>
  )
}

export default FollowButton
