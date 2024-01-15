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

    //urlのハッシュ化
    const encoder = new TextEncoder()
    const data = encoder.encode(url)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
    console.log(hashHex)
    await db.entry.create({
      data: {
        hashed_url: hashHex,
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
      db.activity
        .create({
          data: {
            user_id: user_id,
            bookmark_id: bookmark.id
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
      db.activity
        .delete({
          where: {
            user_id_bookmark_id: {
              user_id: user_id,
              bookmark_id: deleted.id
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
    if (result) {
      db.activity
        .create({
          data: {
            user_id: user_id,
            entry_comment_id: result.id
          }
        })
        .catch((err) => {
          //エラーを無視
          console.log('Activityへの登録に失敗しました')
          console.log(err)
        })
    }
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
    const deleted = await db.entryComment.delete({
      where: {
        id: commentId,
        user_id
      }
    })
    if (deleted) {
      db.activity
        .delete({
          where: {
            user_id_entry_comment_id: {
              user_id: user_id,
              entry_comment_id: deleted.id
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
