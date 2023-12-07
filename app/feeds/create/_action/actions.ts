'use server'

import { db } from '@/server/db'
import { rssParser } from '@/utils/builder'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
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
  const feedItem = await rssParser.parseURL(parsed.feedUrl).catch((err) => {
    console.log(err)
    return null
  })
  if (!feedItem) return { message: 'URLが不正です' }
  const title = feedItem.title
  if (!title) return { message: '不正なURLです' }
  const { feedUrl, userId } = parsed
  const result = await db.feed
    .create({
      data: {
        name: title,
        feedUrl,
        user_id: userId
      }
    })
    .catch((err) => {
      console.log(err)
      return null
    })
  if (!result) return { message: '既に登録されています' }
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
