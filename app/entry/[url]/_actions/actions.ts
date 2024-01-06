'use server'

import { authOptions } from '@/server/auth'
import { db } from '@/server/db'
import { getServerSession } from 'next-auth'

export const createEntry = async ({
  title,
  url,
  image
}: {
  title: string | null
  url: string
  image: string | null
}) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error('権限がありません')
    const user_id = session.user.id
    await db.entry.create({
      data: {
        title,
        image,
        url,
        user: {
          connect: {
            id: user_id
          }
        }
      }
    })
    return { error: null }
  } catch (error) {
    console.log(error)
    return { error: 'エラーが発生しました' }
  }
}

export const bookmarkEntry = async ({ entryId }: { entryId: string }) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error('権限がありません')
    const user_id = session.user.id
    const bookmark = await db.bookmark.create({
      data: {
        entry: {
          connect: {
            id: entryId
          }
        },
        user: {
          connect: {
            id: user_id
          }
        }
      }
    })
    if (bookmark) {
      await db.activity
        .create({
          data: {
            user_id: user_id,
            type: 'bookmark',
            target_id: bookmark.id
          }
        })
        .catch((err) => {
          //エラーを無視
          console.log('Activityへの登録に失敗しました')
          console.log(err)
        })
    }
    return { error: null }
  } catch (error) {
    console.log(error)
    return { error: 'エラーが発生しました' }
  }
}

export const deleteBookmark = async ({ entryId }: { entryId: string }) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error('権限がありません')
    const user_id = session.user.id
    const deleted = await db.bookmark.delete({
      where: {
        entry_id_user_id: {
          entry_id: entryId,
          user_id
        }
      }
    })
    if (deleted) {
      await db.activity
        .delete({
          where: {
            user_id_target_id_type: {
              user_id: user_id,
              target_id: deleted.id,
              type: 'bookmark'
            }
          }
        })
        .catch((err) => {
          //エラーを無視
          console.log('Activityの削除に失敗しました')
          console.log(err)
        })
    }
    return { error: null }
  } catch (error) {
    console.log(error)
    return { error: 'エラーが発生しました' }
  }
}

export const addComment = async ({ content, entryId }: { content: string; entryId: string }) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error('権限がありません')
    const user_id = session.user.id
    const result = await db.entryComment.create({
      data: {
        content,
        entry: {
          connect: {
            id: entryId
          }
        },
        user: {
          connect: {
            id: user_id
          }
        }
      }
    })
    return { result, error: null }
  } catch (err) {
    console.error(err)
    return { result: null, error: 'エラーが発生しました' }
  }
}

export const deleteComment = async ({ commentId }: { commentId: string }) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error('権限がありません')
    const user_id = session.user.id
    await db.entryComment.delete({
      where: {
        id: commentId,
        user_id
      }
    })
    return { error: null }
  } catch (error) {
    console.log(error)
    return { error: 'エラーが発生しました' }
  }
}
