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
  let exist2Words = false
  const searchWords = q.split(' ')
  const search = searchWords
    .map((word) => {
      if (word.length <= 2) {
        exist2Words = true
      }
      return '+' + word
    })
    .join(' ')
  const start = new Date()

  const searchObjects = searchWords.map((word) => ({
    title: {
      contains: word
    }
  }))
  const result = exist2Words
    ? // 2文字以下のワードがあるとき
      await db.post.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        where: {
          AND: searchObjects
        },
        skip: offset,
        take
      })
    : // 2文字以下のワードがないとき
      await db.post.findMany({
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

// 同義語リスト
const synonymLists = {
  go: ['golang'],
  nextjs: ['next.js'],
  ラズパイ: ['raspberry pi']
}
