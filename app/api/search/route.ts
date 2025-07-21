import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { NextRequest } from 'next/server'
import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 }) // 1日

export const GET = async (req: NextRequest) => {
  const q = req.nextUrl.searchParams.get('q')
  const offsetString = req.nextUrl.searchParams.get('offset') //指定しないときはnullになる
  const offset = offsetString ? parseInt(offsetString) : 10
  const take = 10

  if (!q) return Response.json({ message: '検索ワードを入力してください' })
  const searchWords = q.replaceAll('　', ' ').toLowerCase().split(' ')
  const cacheKey = 'search' + searchWords + offset
  const cachedPosts = cache.get(cacheKey)
  if (cachedPosts) {
    return Response.json(cachedPosts)
  }
  const start = new Date()
  const result = await db.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      AND: searchWords.map(word => ({
        title: {
          contains: word
        }
      }))
    },
    skip: offset,
    take
  })

  const returnPosts = await addOgp(result)
  const end = new Date()
  console.log('[db] search time: ' + (end.getTime() - start.getTime()) + 'ms')
  const count = result.length
  cache.set(cacheKey, returnPosts)
  return Response.json(returnPosts)
}
