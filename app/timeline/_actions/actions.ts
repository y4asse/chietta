'use server'

import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'

export const getFollowingUserPosts = async (userId: string) => {
  try {
    const result = await db.userPost.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true, _count: { select: { like: true } } },
      where: { isPublic: true, OR: [{ user: { Followers: { some: { user_id: userId } } } }, { user_id: userId }] }
    })
    const userPosts = await addOgp(result)
    return { userPosts, error: null }
  } catch (err) {
    console.log(err)
    return { userPosts: null, error: 'エラーが発生しました' }
  }
}
