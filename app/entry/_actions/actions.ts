'use server'

import { authOptions } from '@/server/auth'
import { db } from '@/server/db'
import { getServerSession } from 'next-auth'

export const createEntry = async ({
  title,
  url,
  image
}: {
  title: string | null
  url: string
  image: string | null
}) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error('権限がありません')
    const user_id = session.user.id
    await db.entry.create({
      data: {
        title,
        image,
        url,
        user: {
          connect: {
            id: user_id
          }
        }
      }
    })
    return { error: null }
  } catch (error) {
    console.log(error)
    return { error: 'エラーが発生しました' }
  }
}
