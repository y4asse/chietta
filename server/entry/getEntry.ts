import { Prisma } from '@prisma/client'
import { db } from '../db'
import { getHashedUrl } from '@/utils/getHashedUrl'

export type EntryType = Prisma.PromiseReturnType<typeof getEntry>

export const getEntry = async ({ url }: { url: string }) => {
  try {
    const hashedUrl = await getHashedUrl(url)
    const entry = await db.entry.findUnique({
      include: {
        Bookmark: true
      },
      where: {
        hashed_url: hashedUrl
      }
    })
    return entry
  } catch (error) {
    console.error(error)
    return null
  }
}
