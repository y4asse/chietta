import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 5 * 60 // 5分に一回更新する

export const GET = async (req: NextRequest, res: NextResponse) => {
  const offsetString = req.nextUrl.searchParams.get('offset')
  const userId = req.nextUrl.searchParams.get('user_id')
  console.log(userId)
  const offset = offsetString ? parseInt(offsetString) : 0 // 不正な値の時0になる
  const posts = await getPostsFromDb({ offset: offset ? offset : 0, userId })
  const postsWithOgp = await addOgp(posts)
  return Response.json(postsWithOgp)
}

const getPostsFromDb = async ({ offset, userId }: { offset: number; userId: string | null }) => {
  const take = 10
  const startTimeline = Date.now()

  // ユーザーがログインしていない場合
  const dbPosts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
    take,
    skip: offset
  })

  const endTimeline = Date.now()
  console.log('[getPostsFromDb] get posts = ' + (endTimeline - startTimeline) + 'ms')
  return dbPosts
}
