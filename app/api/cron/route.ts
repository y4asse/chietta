import { db } from '@/server/db'
import { kv } from '@/server/redis'
import { QiitaResponse } from '@/types/qiita'
import { ZennResponse } from '@/types/zenn'
import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 60 * 5

export const GET = async (req: NextRequest, res: NextResponse) => {
  const zenn = await updateZenn()
  const qiita = await updateQiita()
  const newPosts = [...zenn, ...qiita]
  return Response.json({ updatedPosts: newPosts })
}

const updateRedis = async (
  newPosts: {
    url: string
    provider: string
    createdAt: Date
    title: string
  }[]
) => {
  if (newPosts.length === 0) return

  //dbからidも取得
  const newDbPosts = await db.post.findMany({
    where: { url: { in: newPosts.map(({ url }) => url) } }
  })

  // redisへ書き込み
  // 用意
  const pipeline = kv.pipeline()
  newDbPosts.map((post) => {
    pipeline.hset(`post:${post.id}`, {
      title: post.title,
      url: post.url,
      createdAt: post.createdAt
    })
    pipeline.expire(`post:${post.id}`, 60 * 60 * 24 * 7)
    pipeline.zadd('timeline', {
      score: -post.createdAt.getTime(),
      member: post.id
    })
  })

  // 実行
  const execStart = Date.now()
  const result = await pipeline.exec()
  const execEnd = Date.now()
  console.log(`redis exec time: ${execEnd - execStart}ms`)
  const overFlowCount = (await kv.zcard('timeline')) - 1000
  if (overFlowCount > 0) {
    void kv.zremrangebyrank('timeline', 0, overFlowCount - 1)
  }

  return newDbPosts
}

const updateZenn = async () => {
  // zennから取得
  const res = await fetch(`https://zenn.dev/api/articles?order=latest`, {
    cache: 'no-store'
  }).then(async (res) => (await res.json()) as ZennResponse)
  const allUrl = res.articles.map(({ path }) => 'https://zenn.dev' + path)
  const existingPosts = await db.post.findMany({
    where: { url: { in: allUrl } }
  })
  const existingUrl = existingPosts.map(({ url }) => url)
  // existingUrlにないpostをresから取得
  const newPosts = res.articles.filter((article) => !existingUrl.includes('https://zenn.dev' + article.path))

  const insertPosts: {
    url: string
    createdAt: Date
    title: string
  }[] = []
  newPosts.map((result, i) => {
    insertPosts.push({
      url: 'https://zenn.dev' + newPosts[i].path,
      createdAt: new Date(newPosts[i].published_at),
      title: newPosts[i].title
    })
  })

  // dbへ書き込み
  const { count } = await db.post.createMany({
    data: insertPosts,
    skipDuplicates: true
  })
  console.log('[zenn] update count: ' + count)
  return insertPosts
}

const updateQiita = async () => {
  const apiKey = process.env.QIITA_API!
  const perPage = 50
  const res = await fetch(`https://qiita.com/api/v2/items?per_page=${perPage}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    cache: 'no-store'
  }).then(async (res) => (await res.json()) as QiitaResponse)
  const allUrl = res.map(({ url }) => url)
  const existingPosts = await db.post.findMany({
    where: { url: { in: allUrl } },
    orderBy: { createdAt: 'desc' }
  })
  const existingUrl = existingPosts.map(({ url }) => url)
  const newPosts = res.filter(({ url }) => !existingUrl.includes(url))

  const insertPosts: {
    url: string
    createdAt: Date
    title: string
  }[] = []
  newPosts.map((result, i) => {
    insertPosts.push({
      url: newPosts[i].url,
      createdAt: new Date(newPosts[i].created_at),
      title: newPosts[i].title
    })
  })

  // dbへ書き込み
  const { count } = await db.post.createMany({
    data: insertPosts,
    skipDuplicates: true
  })
  console.log('[qiita] update count: ' + count)
  return insertPosts
}
