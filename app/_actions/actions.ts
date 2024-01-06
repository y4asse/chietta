'use server'

import { authOptions } from '@/server/auth'
import { db } from '@/server/db'
import { getOgp } from '@/server/getOgp'
import { getServerSession } from 'next-auth'

export const createBookmarkByUrl = async ({ url }: { url: string }) => {
  try {
    const ogp = await getOgp(url)
    const title = ogp ? (ogp.ogTitle ? ogp.ogTitle : null) : null
    const image = ogp ? (ogp.ogImage ? ogp.ogImage[0].url : null) : null
    const session = await getServerSession(authOptions)
    if (!session) throw new Error('権限がありません')
    const user_id = session.user.id
    await db.bookmark.create({
      data: {
        user: {
          connect: {
            id: user_id
          }
        },
        entry: {
          connectOrCreate: {
            where: { url },
            create: { url, title, image, user: { connect: { id: user_id } } }
          }
        }
      }
    })
    return { error: null }
  } catch (error) {
    console.error(error)
    return { error: 'エラーが発生しました' }
  }
}

export const deleteBookmarkByUrl = async ({ url }: { url: string }) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error('権限がありません')
    const user_id = session.user.id
    const entry = await db.entry.findUnique({
      where: {
        url: url
      }
    })
    if (!entry) throw new Error('エントリーが見つかりません')
    await db.bookmark.delete({
      where: {
        entry_id_user_id: {
          entry_id: entry.id,
          user_id: user_id
        }
      }
    })
    return { error: null }
  } catch (error) {
    console.error(error)
    return { error: 'エラーが発生しました' }
  }
}
