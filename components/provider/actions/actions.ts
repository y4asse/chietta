'use server'

import { authOptions } from '@/server/auth'
import { db } from '@/server/db'
import { getServerSession } from 'next-auth'

export const getBookmarkings = async () => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error('権限がありません')
    const user_id = session.user.id
    const bookmarks = await db.bookmark.findMany({
      where: {
        user_id
      },
      include: {
        entry: true
      }
    })
    return { bookmarks: bookmarks, error: null }
  } catch (err) {
    console.error(err)
    return { bookmarks: null, error: 'エラーが発生しました' }
  }
}
