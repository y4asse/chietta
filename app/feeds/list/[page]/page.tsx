import FeedLists from '@/components/feeds/list/FeedLists'
import PageNation from '@/components/feeds/list/PageNation'
import LayoutTitle from '@/components/layout/LayoutTitle'
import { db } from '@/server/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

const Page = async ({ params }: { params: { page: string } }) => {
  const take = 10
  const page = parseInt(params.page)
  const skip = page * take
  const getFeeds = db.feed
    .findMany({
      take,
      skip,
      orderBy: {
        FollowFeed: {
          _count: 'desc'
        }
      },
      include: {
        _count: {
          select: {
            FollowFeed: true
          }
        }
      }
    })
    .catch(() => null)
  const getTotalCount = db.feed.count()
  const [feeds, totalCount] = await Promise.all([getFeeds, getTotalCount])
  const totalPageCount = Math.floor(totalCount / take) + 1
  if (!feeds || totalPageCount < page + 1) return notFound()
  return (
    <div className="max-w-[1000px] mx-auto px-1">
      <LayoutTitle text="企業ブログ一覧" />
      <div className="text-right">
        <Link href="/feeds/create" className="bg-primary px-3 py-1 text-[white] rounded font-bold">
          新規登録
        </Link>
      </div>
      <FeedLists feeds={feeds} />
      <PageNation totalCount={totalCount} page={page} countPerPage={take} />
    </div>
  )
}

export default Page
