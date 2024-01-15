'use server'

import { authOptions } from '@/server/auth'
import { db } from '@/server/db'
import { getOgp } from '@/server/getOgp'
import { getHashedUrl } from '@/utils/getHashedUrl'
import { getServerSession } from 'next-auth'

export const createBookmarkByUrl = async ({ url }: { url: string }) => {
  try {
    const ogp = await getOgp(url)
    const title = ogp ? (ogp.ogTitle ? ogp.ogTitle : null) : null
    const image = ogp ? (ogp.ogImage ? ogp.ogImage[0].url : null) : null
    const session = await getServerSession(authOptions)
    if (!session) throw new Error('権限がありません')
    const user_id = session.user.id
    const hashedUrl = await getHashedUrl(url)
    const bookmark = await db.bookmark.create({
      data: {
        user: {
          connect: {
            id: user_id
          }
        },
        entry: {
          connectOrCreate: {
            where: { hashed_url: hashedUrl },
            create: { url, hashed_url: hashedUrl, title, image, user: { connect: { id: user_id } } }
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
    console.error(error)
    return { error: 'エラーが発生しました' }
  }
}

export const deleteBookmarkByUrl = async ({ url }: { url: string }) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error('権限がありません')
    const user_id = session.user.id
    const hashedUrl = await getHashedUrl(url)
    const entry = await db.entry.findUnique({
      where: {
        hashed_url: hashedUrl
      }
    })
    if (!entry) throw new Error('エントリーが見つかりません')
    const deleted = await db.bookmark.delete({
      where: {
        entry_id_user_id: {
          entry_id: entry.id,
          user_id: user_id
        }
      }
    })
    if (deleted) {
      db.activity
        .delete({
          where: {
            user_id_bookmark_id: {
              bookmark_id: deleted.id,
              user_id: user_id
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
    console.error(error)
    return { error: 'エラーが発生しました' }
  }
}
