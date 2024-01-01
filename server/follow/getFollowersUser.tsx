import { db } from '../db'

export const getFollowersUser = async ({ userName }: { userName: string }) => {
  try {
    const result = await db.follow.findMany({
      where: {
        following_user: {
          idCreatedByUser: userName
        }
      },
      include: {
        user: {
          select: {
            image: true,
            name: true,
            idCreatedByUser: true,
            introduction: true,
            id: true
          }
        }
      }
    })
    const users = result.map((value) => value.user)
    return { users }
  } catch (err) {
    console.log(err)
    return null
  }
}
