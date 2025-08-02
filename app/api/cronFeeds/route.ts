import { db } from '@/server/db'
import { rssParser } from '@/utils/builder'
import { Feed, FeedArticle } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.MY_SECRET_TOKEN) {
    return Response.json({ error: 'invalid token' }, { status: 401 })
  }

  const feeds = await db.feed.findMany({})
  const procsess = feeds.map(async (feed) => {
    try {
      const { feedUrl, id } = feed
      const feedItem = await rssParser.parseURL(feedUrl)
      const { items } = feedItem as { items: { title: string; link: string; pubDate: string; isoDate: string }[] }
      const insertData = items.map((item) => {
        const createdAt = item.pubDate ? new Date(item.pubDate) : item.isoDate ? new Date(item.isoDate) : new Date()
        return {
          title: item.title,
          url: item.link,
          createdAt,
          feed_id: id
        } as FeedArticle
      })
      const { count } = await db.feedArticle.createMany({
        data: insertData,
        skipDuplicates: true
      })
      console.log(`${feed.name}: ${count} 件追加`)
    } catch (error) {
      console.error(`フィード処理エラー: ${feed.name} (${feed.feedUrl})`)
      console.error(`エラー詳細: ${error instanceof Error ? error.message : String(error)}`)
      console.error(`スタックトレース:`, error)
    }
  })
  await Promise.all(procsess)
  return Response.json({ message: 'success' })
}
