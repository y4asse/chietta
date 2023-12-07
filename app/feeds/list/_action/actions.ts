'use server'

import { db } from '@/server/db'

export const createFollowFeed = async ({ userId, feedId }: { userId: string; feedId: string }) => {
  try {
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
