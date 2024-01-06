import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { NextRequest } from 'next/server'
import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 60 * 30 }) // 30分

export const GET = async (req: NextRequest) => {
  const offsetString = req.nextUrl.searchParams.get('offset')
  const offset = offsetString ? parseInt(offsetString) : 0 // 不正な値の時0になる
  const cacheKey = 'trends' + offset
  const cachedPosts = cache.get(cacheKey)
  if (cachedPosts) {
    return Response.json(cachedPosts)
  }
  const startTime = Date.now()
  const take = 10
  const articles = await db.trends.findMany({})
  const now = Date.now()
  const articlesWithLikesPerHour = articles.map((trend) => {
    const date = new Date(trend.createdAt.toString()).getTime()
    const durationInHours = Math.round((now - date) / 3600000) // ミリ秒を時間に変換
    const likesPerHour = trend.likedCount / durationInHours
    return { ...trend, likesPerHour }
  })
  const sortedArticles = articlesWithLikesPerHour.sort((a, b) => b.likesPerHour - a.likesPerHour)
  const endTime = Date.now()
  console.log('[getPostsFromDB] get trends from DB = ' + (endTime - startTime) + 'ms')
  const returnPosts = await addOgp(sortedArticles.slice(offset, offset + take))
  cache.set(cacheKey, returnPosts)
  return Response.json(returnPosts)
}
