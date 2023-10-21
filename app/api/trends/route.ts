import { addOgp } from '@/server/addOgp'
import { TrendArticle } from '@/types/trendsArticle'
import { NextRequest, NextResponse } from 'next/server'

export type ReturnPost = {
  id: string
  title: string
  url: string
  createdAt: Date
  image_url: string
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  const offsetString = req.nextUrl.searchParams.get('offset')
  const offset = offsetString ? parseInt(offsetString) : 0 // 不正な値の時0になる
  const articles = await getTrendsFromRedis(offset)
  const returnPosts = await addOgp(articles)
  return Response.json(returnPosts)
}

const getTrendsFromRedis = async (offset: number) => {
  const locate = process.env.NODE_ENV === 'development' ? 'trends-dev' : 'trends'
  const take = 9 + offset
  const startTime = Date.now()
  // TODO restにして、キャッシュする
  const trendsJson = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/zrange/${locate}/${offset}/${take}`, {
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`
    },
    next: { revalidate: 5 * 60 }
  }).then(async (res) => (await res.json()).result as string[])
  const trends = trendsJson.map((trend) => JSON.parse(trend) as TrendArticle)
  const endTime = Date.now()
  console.log('[getPostsFromRedis] get trends = ' + (endTime - startTime) + 'ms')
  if (trends.length === 0) return []
  return trends
}
