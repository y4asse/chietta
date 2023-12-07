import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
  const offsetString = req.nextUrl.searchParams.get('offset')
  const userId = req.nextUrl.searchParams.get('user_id')
  if (!userId) return Response.json({ message: 'user_id is required' }, { status: 400 })
  const offset = offsetString ? parseInt(offsetString) : 0 // 不正な値の時0になる
  const searchUser = new Date()
  const result = await db.user
    .findUnique({
      where: {
        id: userId
      },
      include: {
        FollowCategory: {
          select: {
            post_category_id: true
          }
        }
      }
    })
    .catch(() => {
      return null
    })
  const endSearchUser = new Date()
  console.log(`[followingCategory] search user ${endSearchUser.getTime() - searchUser.getTime()}ms`)
  if (!result) return Response.json({ message: 'user not found' }, { status: 404 })
  const followingCategory = result.FollowCategory.map((category) => category.post_category_id)
  const take = 10
  const findPosts = new Date()
  const posts = await db.post.findMany({
    where: {
      postCategoryMap: {
        some: {
          post_category_id: {
            in: followingCategory
          }
        }
      }
    },
    include: {
      postCategoryMap: true
    },
    take,
    skip: offset,
    orderBy: {
      createdAt: 'desc'
    }
  })
  const endFindPosts = new Date()
  console.log(`[followingCategory] find posts ${endFindPosts.getTime() - findPosts.getTime()}ms`)
  const returnPosts = await addOgp(posts)
  return Response.json(returnPosts)
}
