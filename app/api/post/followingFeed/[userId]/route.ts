import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { NextRequest } from 'next/server'

export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  const offsetString = req.nextUrl.searchParams.get('offset')
  const { userId } = params
  const offset = offsetString ? parseInt(offsetString) : 0 // 不正な値の時0になる
  const searchUser = new Date()
  const result = await db.user
    .findUnique({
      where: {
        id: userId
      },
      include: {
        FollowFeed: {
          select: {
            feed_id: true
          }
        }
      }
    })
    .catch(() => {
      return null
    })
  const endSearchUser = new Date()
  console.log(`[followingFeed] search user ${endSearchUser.getTime() - searchUser.getTime()}ms`)
  if (!result) return Response.json({ message: 'user not found' }, { status: 404 })
  const followingFeed = result.FollowFeed.map((category) => category.feed_id)
  const take = 10
  const findPosts = new Date()
  const feeds = await db.feedArticle.findMany({
    where: {
      feed_id: {
        in: followingFeed
      }
    },
    include: {
      feed: true
    },
    take,
    skip: offset,
    orderBy: {
      createdAt: 'desc'
    }
  })
  const endFindPosts = new Date()
  console.log(`[followingFeed] find posts ${endFindPosts.getTime() - findPosts.getTime()}ms`)
  const returnPosts = await addOgp(feeds)
  return Response.json(returnPosts)
}
