import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
  const offsetString = req.nextUrl.searchParams.get('offset')
  const userId = req.nextUrl.searchParams.get('user_id')
  if (!userId) return Response.json({ message: 'user_id is required' }, { status: 400 })
  const offset = offsetString ? parseInt(offsetString) : 0 // 不正な値の時0になる
  const result = await db.user.findUnique({
    where: {
      id: userId
    },
    include: {
      FollowCategory: true
    }
  })
  if (!result) return Response.json({ message: 'user not found' }, { status: 404 })
  const followingCategory = result.FollowCategory.map((category) => category.post_category_id)
  const take = 10
  const posts = await db.post.findMany({
    skip: offset,
    take,
    where: {
      postCategoryMap: {
        // someで配列のいずれかの要素が条件を満たすかどうかを判定する
        some: {
          post_category_id: {
            in: followingCategory
          }
        }
      }
    }
  })
  const returnPosts = await addOgp(posts)
  return Response.json(returnPosts)
}
