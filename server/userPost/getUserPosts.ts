import { Prisma } from '@prisma/client'
import { addOgp } from '../addOgp'
import { db } from '../db'

export type UserPostsType = Prisma.PromiseReturnType<typeof getUserPosts>['userPosts']

export const getUserPosts = async (idCreatedByUser: string) => {
  const posts = await db.userPost.findMany({
    where: {
      user: {
        idCreatedByUser
      }
    },
    include: {
      _count: {
        select: { like: true }
      },
      user: {
        select: { id: true, name: true, image: true, idCreatedByUser: true }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  if (!posts) return { userPosts: null }
  const postsWithOgp = await addOgp(posts)
  return { userPosts: postsWithOgp }
}
