import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { NextRequest } from 'next/server'

export const GET = async (req: NextRequest) => {
  const q = req.nextUrl.searchParams.get('q')
  const offsetString = req.nextUrl.searchParams.get('offset') //指定しないときはnullになる
  const offset = offsetString ? parseInt(offsetString) : 10
  const take = 10
  if (!q) return Response.json({ message: '検索ワードを入力してください' })

  // 2文字以下のワードを区別
  const searchWords = q.split(' ')
  const search = searchWords.map((word) => '+' + word + '*').join(' ')
  const start = new Date()
  const result = await db.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      title: {
        search: search
      }
    },
    skip: offset,
    take
  })

  const returnPosts = await addOgp(result)
  const end = new Date()
  console.log('[db] search time: ' + (end.getTime() - start.getTime()) + 'ms')
  const count = result.length
  return Response.json(returnPosts)
}
