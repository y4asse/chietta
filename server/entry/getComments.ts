import { db } from '../db'

export const getComments = async ({ entryId }: { entryId: string }) => {
  try {
    const comments = await db.entryComment.findMany({
      where: { entry: { id: entryId } },
      include: { user: { select: { id: true, name: true, image: true } } },
      orderBy: { createdAt: 'desc' }
    })
    return comments
  } catch (err) {
    console.error(err)
    return null
  }
}
