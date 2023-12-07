'use client'
import { FaUser } from 'react-icons/fa'
import { Feed } from '@prisma/client'
import Link from 'next/link'
import FollowFeedButton from './FollowFeedButton'

const FeedItem = ({
  item
}: {
  item: Feed & {
    _count: {
      FollowFeed: number
    }
  }
}) => {
  return (
    <div className="border border-[#afafaf] rounded p-3 bg-[white]">
      <div>
        <Link href={`/feeds/${item.id}`} className="hover:underline text-xl font-semibold">
          {item.name}
        </Link>
      </div>
      <p className="text-gray break-words">{item.feedUrl}</p>
      <div className="flex items-center gap-1 mt-1">
        <FaUser />
        {item._count.FollowFeed}
      </div>
      <div className="text-right">
        <FollowFeedButton feedId={item.id} />
      </div>
    </div>
  )
}

export default FeedItem
