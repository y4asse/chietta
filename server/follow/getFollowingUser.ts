import { db } from '../db'

export const getFollowingUser = async ({ userName }: { userName: string }) => {
  try {
    //フォロー中のユーザーを取得
    const result = await db.follow.findMany({
      where: {
        user: {
          idCreatedByUser: userName
        }
      },
      include: {
        following_user: {
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
    const users = result.map((r) => r.following_user)
    return { users }
  } catch (err) {
    console.log(err)
    return null
  }
}
