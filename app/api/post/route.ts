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
  if (!userId) {
    const dbPosts = await db.post.findMany({
      orderBy: { createdAt: 'desc' },
      take,
      skip: offset
    })
    return dbPosts.map((post) => ({ ...post, isViewd: false }))
  }

  // ユーザーがログインしている場合
  const dbPosts = db.post.findMany({
    orderBy: { createdAt: 'desc' },
    take,
    skip: offset
  })

  const viewdPosts = db.viewHistory.findMany({
    where: {
      user_id: userId
    }
  })

  const [posts, viewd] = await Promise.all([dbPosts, viewdPosts])
  const retPosts = posts.map((post) => {
    const isViewd = viewd.some((viewdPost) => viewdPost.post_url === post.url)
    if (isViewd) {
      return { ...post, isViewd: true }
    } else {
      return { ...post, isViewd: false }
    }
  })

  const endTimeline = Date.now()
  console.log('[getPostsFromDb] get posts = ' + (endTimeline - startTimeline) + 'ms')
  return retPosts
}
