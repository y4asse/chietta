'use server'

import { authOptions } from '@/server/auth'
import { db } from '@/server/db'
import { getServerSession } from 'next-auth'

export const followUser = async ({ userId, followingUserId }: { userId: string; followingUserId: string }) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.id !== userId) {
      console.log(session?.user.id, userId)
      return { result: null, error: '不正なアクセスです' }
    }
    const result = await db.follow
      .create({
        data: {
          user_id: userId,
          following_user_id: followingUserId
        }
      })
      .catch((err) => {
        console.log(err)
        return null
      })
    return { result: 'success', error: null }
  } catch (err) {
    return { result: null, error: 'エラーが発生しました' }
  }
}

export const unfollowUser = async ({ userId, followingUserId }: { userId: string; followingUserId: string }) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.id !== userId) {
      return { result: null, error: '不正なアクセスです' }
    }
    const deleted = await db.follow.delete({
      where: {
        user_id_following_user_id: {
          following_user_id: followingUserId,
          user_id: userId
        }
      }
    })
    return { result: 'success', error: null }
  } catch (err) {
    console.log(err)
    return { result: null, error: 'エラーが発生しました' }
  }
}
