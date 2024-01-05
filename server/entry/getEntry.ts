import { Prisma } from '@prisma/client'
import { db } from '../db'

export type EntryType = Prisma.PromiseReturnType<typeof getEntry>

export const getEntry = async ({ url }: { url: string }) => {
  try {
    const entry = await db.entry.findUnique({
      include: {
        Bookmark: true
      },
      where: {
        url
      }
    })
    return entry
  } catch (error) {
    console.error(error)
    return null
  }
}
