'use server'
import { db } from '@/server/db'

export const getBookmarkedArticles = async ({
  idCreatedByUser,
  skip,
  take
}: {
  idCreatedByUser: string
  skip: number
  take: number
}) => {
  try {
    const bookmarks = await db.bookmark.findMany({
      where: {
        user: {
          idCreatedByUser
        }
      },
      include: {
        entry: true
      },
      take,
      skip,
      orderBy: {
        createdAt: 'desc'
      }
    })
    const articles = bookmarks.map((bookmark) => bookmark.entry)
    return articles
  } catch (err) {
    console.error(err)
    return null
  }
}
