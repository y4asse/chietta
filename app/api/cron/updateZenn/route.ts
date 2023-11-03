import { db } from '@/server/db'
import { ZennResponse } from '@/types/zenn'
import { PostCategory } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const locate = process.env.NODE_ENV === 'development' ? 'trends-dev' : 'trends'

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
  const zenn = await updateZenn(categories)
  return Response.json({ count: zenn.length })
}

const updateZenn = async (categories: PostCategory[]) => {
  // zennから取得
  const startTime = Date.now()
  const res = await fetch(`https://zenn.dev/api/articles?order=latest`, {
    cache: 'no-store'
  }).then(async (res) => (await res.json()) as ZennResponse)
  const allUrl = res.articles.map(({ path }) => 'https://zenn.dev' + path)
  const { articles } = res
  const MIN_CONTENT_LENGTH = 1000
  const insertPosts: {
    url: string
    createdAt: Date
    title: string
  }[] = []
  articles.map((result, i) => {
    if (result.body_letters_count < MIN_CONTENT_LENGTH) return
    if (result.published === false) return
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
  const endTime = Date.now()
  console.log(`[zenn] update exec: ${endTime - startTime}ms`)
  console.log('[zenn] update count: ' + count)

  //　カテゴリーと紐づけ
  const newPosts = await db.post.findMany({
    orderBy: {
      createdAt: 'desc'
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
