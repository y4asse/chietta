import { Prisma } from '@prisma/client'
import { db } from '../db'

export type CommentsType = Prisma.PromiseReturnType<typeof getComments>

export const getComments = async ({ entryId }: { entryId: string }) => {
  try {
    const comments = await db.entryComment.findMany({
      where: { entry: { id: entryId } },
      include: { user: { select: { id: true, name: true, image: true, idCreatedByUser: true } } },
      orderBy: { createdAt: 'desc' }
    })
    return comments
  } catch (err) {
    console.error(err)
    return null
  }
}
