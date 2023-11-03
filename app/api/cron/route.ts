import { kv } from '@/server/redis'
import { Feed } from '@/types/feed'
import { QiitaArticle } from '@/types/qiita'
import { TrendArticle } from '@/types/trendsArticle'
import { ZennResponse } from '@/types/zenn'
import { NextRequest, NextResponse } from 'next/server'
import { parseStringPromise } from 'xml2js'

const locate = process.env.NODE_ENV === 'development' ? 'trends-dev' : 'trends'

export const GET = async (req: NextRequest, res: NextResponse) => {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.MY_SECRET_TOKEN) {
    return Response.json({ error: 'invalid token' }, { status: 401 })
  }
  await deleteOldTrends()
  const zennTrends = await updateZennTrend()
  const qiitaTrends = await updateQiitaTrend()
  return Response.json({
    zennTrendsCount: zennTrends.length,
    qiitaTrendsCount: qiitaTrends.length
  })
}

const deleteOldTrends = async () => {
  const startTime = Date.now()
  await kv.del(locate)
  const endTime = Date.now()
  console.log(`[delete trends] delete old trends exec pipeline: ${endTime - startTime}ms`)
}

const updateZennTrend = async () => {
  // zennから取得
  const res = await fetch(`https://zenn.dev/api/articles?order=daily`, {
    cache: 'no-store'
  }).then(async (res) => (await res.json()) as ZennResponse)
  const pipeline = kv.pipeline()
  const startTime = Date.now()
  const { articles } = res
  for (const article of articles) {
    const post = {
      url: 'https://zenn.dev' + article.path,
      createdAt: new Date(article.published_at),
      title: article.title,
      likedCount: article.liked_count
    } as TrendArticle
    const stringPost = JSON.stringify(post)
    pipeline.zadd(locate, {
      score: -post.likedCount,
      member: stringPost
    })
  }
  const result = await pipeline.exec()
  const endTime = Date.now()
  console.log(`[zenn] update trends exec: ${endTime - startTime}ms`)
  console.log(`[zenn] update trends count: ${result.length}`)
  return result
}

const updateQiitaTrend = async () => {
  // 30個
  const res = await fetch(`https://qiita.com/popular-items/feed`, {
    cache: 'no-cache'
  })
  const pipeline = kv.pipeline()
  const startTime = Date.now()

  const qiitaFeedResponse = await res.text()
  const jsonData = await parseStringPromise(qiitaFeedResponse)
  const articles = jsonData.feed.entry as Feed
  const asyncFuncs = articles.map(async (article) => {
    const url = new URL(article.link[0].$.href.split('?')[0])
    const articleId = url.pathname.split('/').pop()!
    const res = await fetch(`https://qiita.com/api/v2/items/${articleId}`, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${process.env.QIITA_API}`
      }
    }).then(async (res) => (await res.json()) as QiitaArticle)
    const post = {
      url: res.url,
      createdAt: new Date(article.published[0]),
      title: article.title[0],
      likedCount: res.likes_count
    } as TrendArticle
    const stringPost = JSON.stringify(post)
    pipeline.zadd(locate, {
      score: -post.likedCount,
      member: stringPost
    })
  })
  await Promise.all(asyncFuncs)
  const result = await pipeline.exec()
  const endTime = Date.now()
  console.log(`[qiita] update trends exec : ${endTime - startTime}ms`)
  console.log(`[qiita] update trends count: ${result.length}`)
  return result
}
