import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { NextRequest, NextResponse } from 'next/server'

//フィードのIDをもとに、そのフィードの記事を取得する
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params
  const offsetString = req.nextUrl.searchParams.get('offset')
  const offset = offsetString ? parseInt(offsetString) : 0 // 不正な値の時0になる
  const posts = await getPostsFromDb({ offset: offset ? offset : 0, id })
  const returnPosts = await addOgp(posts)
  return Response.json(returnPosts)
}

const getPostsFromDb = async ({ offset, id }: { offset: number; id: string }) => {
  const take = 10
  const startTimeline = Date.now()
  const posts = await db.feedArticle.findMany({
    where: { feed_id: id },
    orderBy: { createdAt: 'desc' },
    take,
    skip: offset,
    include: { feed: true }
  })
  const endTimeline = Date.now()
  console.log('[getPostsFromDb] get posts = ' + (endTimeline - startTimeline) + 'ms')
  return posts
}
