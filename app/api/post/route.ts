import { db } from '@/server/db'
import { kv } from '@/server/redis'
import { Post } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 0

export const GET = async (req: NextRequest, res: NextResponse) => {
  const offsetString = req.nextUrl.searchParams.get('offset')
  const offset = offsetString ? parseInt(offsetString) : 0 // 不正な値の時0になる
  console.log(offset)
  const posts = await getPostsFromDb({ offset: offset ? offset : 0 })
  //   const posts = await getPostsFromRedis()

  return Response.json(posts)
}

const getPostsFromDb = async ({ offset }: { offset: number }) => {
  const take = 10
  const startTimeline = Date.now()
  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
    take,
    skip: offset
  })
  const endTimeline = Date.now()
  console.log('[getPostsFromDb] get posts = ' + (endTimeline - startTimeline) + 'ms')
  return posts
}

const getPostsFromRedis = async () => {
  const take = 20
  const startTimeline = Date.now()
  const timeline: string[] = await kv.zrange('timeline', 0, take - 1)
  const endTimeline = Date.now()
  console.log('[getPostsFromRedis] get timeline = ' + (endTimeline - startTimeline) + 'ms')
  if (timeline.length === 0) return []
  const pipeline = kv.pipeline()
  timeline.map((id) => {
    pipeline.hgetall(`post:${id}`)
  })
  const startExec = Date.now()

  const result: {
    title: string
    url: string
    createdAt: string
    provider: string
  }[] = await pipeline.exec()
  const endExec = Date.now()
  console.log('[getPostsFromRedis] exec = ' + (endExec - startExec) + 'ms')
  const posts = result.map((post, i) => ({
    ...post,
    id: timeline[i]!,
    createdAt: new Date(post.createdAt)
  }))

  return posts as Post[]
}
