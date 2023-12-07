import FeedLists from '@/components/feeds/list/FeedLists'
import { db } from '@/server/db'
import Link from 'next/link'
import React from 'react'

const Page = async () => {
  const feeds = await db.feed.findMany()
  return (
    <div className="max-w-[1000px] mx-auto px-1">
      <h1 className="text-center text-3xl font-bold my-5">フィード一覧</h1>
      <div className="text-right">
        <Link href="/feeds/create" className="bg-primary px-3 py-1 text-[white] rounded font-bold">
          フィードを新規登録
        </Link>
      </div>
      <FeedLists feeds={feeds} />
    </div>
  )
}

export default Page
