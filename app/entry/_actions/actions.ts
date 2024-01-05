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
    await db.bookmark.create({
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
    await db.bookmark.delete({
      where: {
        entry_id_user_id: {
          entry_id: entryId,
          user_id
        }
      }
    })
    return { error: null }
  } catch (error) {
    console.log(error)
    return { error: 'エラーが発生しました' }
  }
}
