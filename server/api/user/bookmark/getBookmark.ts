import { db } from '@/server/db'

export const getBookmark = async ({
  idCreatedByUser,
  take,
  page
}: {
  idCreatedByUser: string
  take: number
  page: number
}) => {
  try {
    const bookmark = await db.bookmark.findMany({
      where: {
        user: {
          idCreatedByUser
        }
      },
      select: {
        entry: {
          select: {
            url: true,
            title: true,
            createdAt: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take,
      skip: page * take
    })
    return bookmark.map((b) => b.entry)
  } catch (e) {
    console.log('Error in getBookmark')
    console.error(e)
    return null
  }
}
