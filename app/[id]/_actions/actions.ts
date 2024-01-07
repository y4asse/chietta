'use server'

import { authOptions } from '@/server/auth'
import { db } from '@/server/db'
import { getServerSession } from 'next-auth'

export const followUser = async ({ followingUserId }: { followingUserId: string }) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return { result: null, error: '不正なアクセスです' }
    }
    const result = await db.follow
      .create({
        data: {
          user_id: session.user.id,
          following_user_id: followingUserId
        }
      })
      .catch((err) => {
        console.log(err)
        return null
      })

    if (result) {
      db.activity
        .create({
          data: {
            user_id: session.user.id,
            follow_id: result.id
          }
        })
        .catch((err) => {
          //エラーを無視
          console.log('Activityへの登録に失敗しました')
          console.log(err)
        })
    }
    return { result: 'success', error: null }
  } catch (err) {
    return { result: null, error: 'エラーが発生しました' }
  }
}

export const unfollowUser = async ({ followingUserId }: { followingUserId: string }) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return { result: null, error: '不正なアクセスです' }
    }
    const deleted = await db.follow.delete({
      where: {
        user_id_following_user_id: {
          following_user_id: followingUserId,
          user_id: session.user.id
        }
      }
    })

    if (deleted) {
      db.activity
        .delete({
          where: {
            user_id_follow_id: {
              follow_id: deleted.id,
              user_id: session.user.id
            }
          }
        })
        .catch((err) => {
          //エラーを無視
          console.log('Activityの削除に失敗しました')
          console.log(err)
        })
    }
    return { result: 'success', error: null }
  } catch (err) {
    console.log(err)
    return { result: null, error: 'エラーが発生しました' }
  }
}
