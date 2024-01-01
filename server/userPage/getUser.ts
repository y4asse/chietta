import { Prisma } from '@prisma/client'
import { db } from '../db'

export type UserType = Prisma.PromiseReturnType<typeof getUser>

export const getUser = async (idCreatedByUser: string) => {
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
}
