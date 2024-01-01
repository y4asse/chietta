'use server'

import { db } from '@/server/db'
import { getFeedItem } from '@/server/getFeedItem'
import { FeedArticle } from '@prisma/client'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const schema = z.object({
  userId: z.string(),
  feedUrl: z.string().url()
})

export const createFeed = async (prevState: any, formData: FormData) => {
  const parsed = schema.parse({
    userId: formData.get('userId'),
    feedUrl: formData.get('feedUrl')
  })
  const feedItem = await getFeedItem(parsed.feedUrl)
  if (!feedItem) return { message: 'URLが不正です' }
  const title = feedItem.title
  if (!title) return { message: '不正なURLです' }
  const { feedUrl, userId } = parsed
  const result = await db.feed
    .create({
      data: {
        name: title,
        feedUrl,
        user: { connect: { id: userId } }
      }
    })
    .catch((err) => {
      console.log(err)
      return null
    })
  if (!result) return { message: '既に登録されています' }
  try {
    const { id } = result
    const { items } = feedItem
    const insertData = items.map((item) => {
      const createdAt = item.pubDate ? new Date(item.pubDate) : new Date(item.isoDate)
      return {
        title: item.title,
        url: item.link,
        createdAt: createdAt,
        feed_id: id
      } as FeedArticle
    })
    const { count } = await db.feedArticle.createMany({
      data: insertData,
      skipDuplicates: true
    })
  } catch (err) {
    console.log(err)
    await db.feed.delete({ where: { id: result.id } })
    return { message: 'エラーが発生しました' }
  }
  redirect(`/feeds/${result.id}`)
}

export const deleteFeed = async (id: string) => {
  try {
    await db.feed.delete({ where: { id } })
    return { message: 'success' }
  } catch (err) {
    console.log(err)
    return { message: 'error' }
  }
}
