'use server'

import { authOptions } from '@/server/auth'
import { db } from '@/server/db'
import { getServerSession } from 'next-auth'

export const createFollowFeed = async ({ userId, feedId }: { userId: string; feedId: string }) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.id !== userId) {
      return { result: null, error: '不正なアクセスです' }
    }
    const result = await db.followFeed
      .create({
        data: {
          feed_id: feedId,
          user_id: userId
        }
      })
      .catch((err) => {
        console.log(err)
        return null
      })
    return { result, error: null }
  } catch (err) {
    return { result: null, error: 'エラーが発生しました' }
  }
}

export const deleteFollowFeed = async ({ userId, feedId }: { userId: string; feedId: string }) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.id !== userId) {
      return { result: null, error: '不正なアクセスです' }
    }
    const deleted = await db.followFeed.delete({
      where: {
        user_id_feed_id: {
          feed_id: feedId,
          user_id: userId
        }
      }
    })
    return { result: deleted, error: null }
  } catch (err) {
    console.log(err)
    return { result: null, error: 'エラーが発生しました' }
  }
}
