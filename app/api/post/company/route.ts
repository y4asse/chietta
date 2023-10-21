import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 5 * 60 // 5分に一回更新する

export type ReturnPost = {
  id: string
  title: string
  url: string
  createdAt: Date
  image_url: string
  likedCount?: number
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  const offsetString = req.nextUrl.searchParams.get('offset')
  const offset = offsetString ? parseInt(offsetString) : 0 // 不正な値の時0になる
  const posts = await getPostsFromDb({ offset: offset ? offset : 0 })
  const returnPosts = await addOgp(posts)
  return Response.json(returnPosts)
}

const getPostsFromDb = async ({ offset }: { offset: number }) => {
  const take = 10
  const startTimeline = Date.now()
  const posts = await db.companyArticle.findMany({
    orderBy: { createdAt: 'desc' },
    take,
    skip: offset
  })
  const endTimeline = Date.now()
  console.log('[getPostsFromDb] get posts = ' + (endTimeline - startTimeline) + 'ms')
  return posts
}
