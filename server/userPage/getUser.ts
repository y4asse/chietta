import { Prisma } from '@prisma/client'
import { db } from '../db'

export type UserType = Prisma.PromiseReturnType<typeof getUser>

export const getUser = async (idCreatedByUser: string) => {
  try {
    const user = await db.user.findUnique({
      where: { idCreatedByUser },
      select: {
        Followers: true,
        Follow: true,
        idCreatedByUser: true,
        id: true,
        name: true,
        image: true,
        introduction: true,
        x: true,
        github: true,
        zenn: true,
        qiita: true,
        note: true,
        hatena: true,
        webSite: true
      }
    })
    return user
  } catch (e) {
    console.log('Error in getUser')
    console.error(e)
    return null
  }
}
