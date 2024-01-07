import { Activity, Bookmark, EntryComment, Follow, Prisma } from '@prisma/client'
import { db } from '../db'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'

export type UserActivitis = Prisma.PromiseReturnType<typeof getUserActivities>

export const getUserActivities = async () => {
  const take = 20
  try {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error('No session found')

    const following = await db.follow.findMany({
      where: {
        user_id: session.user.id
      },
      select: {
        following_user_id: true
      }
    })

    const activities = await db.activity.findMany({
      where: {
        user_id: {
          in: following.map((f) => f.following_user_id)
        }
      },
      take,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            idCreatedByUser: true
          }
        },
        entryComment: {
          include: {
            entry: true
          }
        },
        follow: {
          include: {
            following_user: {
              select: {
                id: true,
                name: true,
                image: true,
                idCreatedByUser: true,
                introduction: true
              }
            }
          }
        },
        bookmark: {
          include: {
            entry: true
          }
        }
      }
    })

    return activities
  } catch (err) {
    console.log('Error in getUserActivities.ts: ', err)
    return null
  }
}
