import { db } from '@/server/db'
import { QiitaResponse } from '@/types/qiita'
import { PostCategory } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.MY_SECRET_TOKEN) {
    return Response.json({ error: 'invalid token' }, { status: 401 })
  }
  const categories = await db.postCategory.findMany({
    orderBy: {
      id: 'asc'
    }
  })
  const qiita = await updateQiita(categories)

  return Response.json({ count: qiita.length })
}

const updateQiita = async (categories: PostCategory[]) => {
  const startTime = Date.now()
  const apiKey = process.env.QIITA_API!
  const MIN_CONTENT_LENGTH = 1000
  const perPage = 50
  const res = await fetch(`https://qiita.com/api/v2/items?per_page=${perPage}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    cache: 'no-store'
  }).then(async (res) => (await res.json()) as QiitaResponse)
  const articles = res
  const insertPosts: {
    url: string
    createdAt: Date
    title: string
  }[] = []
  articles.map((result, i) => {
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
  const endTime = Date.now()
  console.log(`[qiita] update exec: ${endTime - startTime}ms`)
  console.log('[qiita] update count: ' + count)

  // カテゴリーと紐づけ
  const newPosts = await db.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      url: {
        startsWith: 'https://qiita.com'
      }
    },
    take: count
  })
  const data: { post_category_id: number; post_id: string }[] = []
  newPosts.map((post) => {
    categories.map(async (category) => {
      if (post.title.toLowerCase().includes(category.name.toLowerCase())) {
        data.push({
          post_category_id: category.id,
          post_id: post.id
        })
      }
    })
  })
  const result = await db.postCategoryMap.createMany({
    data: data,
    skipDuplicates: true
  })
  console.log(result)
  return insertPosts
}
