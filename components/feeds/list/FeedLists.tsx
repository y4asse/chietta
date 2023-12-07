'use client'

import { useEffect } from 'react'
import FeedItem from './FeedItem'
import { Feed, FollowFeed, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useAtom } from 'jotai'
import { followingFeedAtom } from '@/jotai/followingFeedAtom'

const FeedLists = ({ feeds }: { feeds: Feed[] }) => {
  const { data: session, status } = useSession()
  const [followingFeed, setFollowingFeed] = useAtom(followingFeedAtom)
  useEffect(() => {
    if (!session) return
    const fetchFeeds = async () => {
      const res = await fetch(`/api/feeds/following/${session.user.id}`)
      if (!res.ok) return
      const data = (await res.json()) as { result: FollowFeed & { feed: Feed }[] }
      const followingFeeds = data.result.map((item) => item.feed)
      setFollowingFeed(followingFeeds)
    }
    fetchFeeds()
  }, [session])
  return (
    <div className="flex flex-col gap-3 mt-5">
      {feeds.map((item) => {
        return <FeedItem key={item.id} item={item} />
      })}
    </div>
  )
}

export default FeedLists
