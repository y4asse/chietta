import { db } from '@/server/db'
import { kv } from '@/server/redis'
import { Feed } from '@/types/feed'
import { QiitaArticle, QiitaResponse } from '@/types/qiita'
import { TrendArticle } from '@/types/trendsArticle'
import { ZennResponse } from '@/types/zenn'
import { NextRequest, NextResponse } from 'next/server'
import { parseStringPromise } from 'xml2js'

export const GET = async (req: NextRequest, res: NextResponse) => {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.MY_SECRET_TOKEN) {
    return Response.json({ error: 'invalid token' }, { status: 401 })
  }
  //db
  const zenn = await updateZenn()
  const qiita = await updateQiita()
  const newPosts = [...zenn, ...qiita]

  //redis
  const zennTrends = await getZennTrends()
  const qiitaTrends = await getQiitaTrends()
  await updateRedis(zennTrends, qiitaTrends)
  return Response.json({
    updatedPosts: newPosts
  })
}

const deleteOldTrends = async () => {
  const startTime = Date.now()
  await kv.del('trend').catch((e) => console.log(e))
  const endTime = Date.now()
  console.log(`[trends] delete old trends exec pipeline: ${endTime - startTime}ms`)
}

const updateRedis = async (zennTrends: TrendArticle[], qiitaTrends: TrendArticle[]) => {
  const startTime = Date.now()

  // likeCountを降順にソート
  const trends = [...zennTrends, ...qiitaTrends].sort((a, b) => {
    return a.likedCount > b.likedCount ? -1 : 1
  })

  const stringTrends = JSON.stringify(trends)
  await kv.set('trend', stringTrends)
  const endTime = Date.now()
  console.log(`[trend] update trend exec: ${endTime - startTime}ms`)
}

const getZennTrends = async () => {
  // zennから取得
  const trends = [] as TrendArticle[]
  const res = await fetch(`https://zenn.dev/api/articles?order=daily`, {
    cache: 'no-store'
  }).then(async (res) => (await res.json()) as ZennResponse)
  const { articles } = res
  for (const article of articles) {
    const post = {
      url: 'https://zenn.dev' + article.path,
      createdAt: new Date(article.published_at),
      title: article.title,
      likedCount: article.liked_count
    } as TrendArticle
    trends.push(post)
  }
  return trends
}

const getQiitaTrends = async () => {
  // 30個
  const trends = [] as TrendArticle[]
  const res = await fetch(`https://qiita.com/popular-items/feed`, {
    cache: 'no-cache'
  })

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
    trends.push(post)
  })
  await Promise.all(asyncFuncs)
  return trends
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
  const MIN_CONTENT_LENGTH = 1000
  const insertPosts: {
    url: string
    createdAt: Date
    title: string
  }[] = []
  newPosts.map((result, i) => {
    if (result.body_letters_count < MIN_CONTENT_LENGTH) return
    insertPosts.push({
      url: 'https://zenn.dev' + result.path,
      createdAt: new Date(result.published_at),
      title: result.title
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
  const MIN_CONTENT_LENGTH = 1000
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
    if (result.rendered_body.length < MIN_CONTENT_LENGTH) return
    insertPosts.push({
      url: result.url,
      createdAt: new Date(result.created_at),
      title: result.title
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
