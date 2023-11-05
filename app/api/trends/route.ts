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
  const articles = await db.trends.findMany({
    orderBy: { likedCount: 'desc' },
    take,
    skip: offset
  })
  const endTime = Date.now()
  console.log('[getPostsFromDB] get trends from DB = ' + (endTime - startTime) + 'ms')
  const returnPosts = await addOgp(articles)
  cache.set(cacheKey, returnPosts)
  return Response.json(returnPosts)
}
