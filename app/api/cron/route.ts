import { db } from '@/server/db'
import { kv } from '@/server/redis'
import { QiitaResponse } from '@/types/qiita'
import { ZennArticle, ZennResponse } from '@/types/zenn'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
  const zennNewPosts = await updateZenn()
  const qiitaNewPosts = await updateQiita()
  const newPosts = [...zennNewPosts, ...qiitaNewPosts]
  const newDbPosts = await updateRedis(newPosts)
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
      createdAt: post.createdAt,
      provider: post.provider
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
  const res = await fetch(`https://zenn.dev/api/articles?order=latest`).then(
    async (res) => (await res.json()) as ZennResponse
  )
  const allUrl = res.articles.map(({ path }) => 'https://zenn.dev' + path)
  const existingPosts = await db.post.findMany({
    where: { url: { in: allUrl } }
  })
  const existingUrl = existingPosts.map(({ url }) => url)
  // existingUrlにないpostをresから取得
  const newPosts = res.articles.filter((article) => !existingUrl.includes('https://zenn.dev' + article.path))
  const insertPosts = newPosts.map((article: ZennArticle) => ({
    url: 'https://zenn.dev' + article.path,
    provider: 'zenn',
    createdAt: new Date(article.published_at),
    title: article.title
  }))

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
    }
  }).then(async (res) => (await res.json()) as QiitaResponse)
  const allUrl = res.map(({ url }) => url)
  const existingPosts = await db.post.findMany({
    where: { url: { in: allUrl } },
    orderBy: { createdAt: 'desc' }
  })
  const existingUrl = existingPosts.map(({ url }) => url)
  const newPosts = res.filter(({ url }) => !existingUrl.includes(url))
  const insertPosts = newPosts.map((article) => ({
    url: article.url,
    provider: 'qiita',
    createdAt: new Date(article.created_at),
    title: article.title
  }))

  // dbへ書き込み
  const { count } = await db.post.createMany({
    data: insertPosts,
    skipDuplicates: true
  })
  console.log('[qiita] update count: ' + count)
  return insertPosts
}
