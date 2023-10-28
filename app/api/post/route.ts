import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
  const offsetString = req.nextUrl.searchParams.get('offset')
  const offset = offsetString ? parseInt(offsetString) : 0 // 不正な値の時0になる
  const posts = await getPostsFromDb({ offset: offset ? offset : 0 })
  const postsWithOgp = await addOgp(posts)
  return Response.json(postsWithOgp)
}

const getPostsFromDb = async ({ offset }: { offset: number }) => {
  const take = 10
  const startTimeline = Date.now()

  const dbPosts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
    take,
    skip: offset
  })

  const endTimeline = Date.now()
  console.log('[getPostsFromDb] get posts = ' + (endTimeline - startTimeline) + 'ms')
  return dbPosts
}
