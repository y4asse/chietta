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
  for (const feed of feeds) {
    const { feedUrl, id } = feed
    const feedItem = await rssParser.parseURL(feedUrl)
    const { items } = feedItem as { items: { title: string; link: string; pubDate: string }[] }
    const insertData = items.map(
      (item) =>
        ({
          title: item.title,
          url: item.link,
          createdAt: new Date(item.pubDate),
          feed_id: id
        } as FeedArticle)
    )
    const { count } = await db.feedArticle.createMany({
      data: insertData,
      skipDuplicates: true
    })
    console.log(`${feed.name}: ${count}`)
  }
  return Response.json({})
}
