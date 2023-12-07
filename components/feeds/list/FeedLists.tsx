'use client'

import FeedItem from './FeedItem'
import { Feed } from '@prisma/client'

const FeedLists = ({
  feeds
}: {
  feeds: (Feed & {
    _count: {
      FollowFeed: number
    }
  })[]
}) => {
  return (
    <div className="flex flex-col gap-3 mt-5">
      {feeds.map((item) => {
        return <FeedItem key={item.id} item={item} />
      })}
    </div>
  )
}

export default FeedLists
