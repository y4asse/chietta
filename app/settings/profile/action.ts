'use server'

import { authOptions } from '@/server/auth'
import { db } from '@/server/db'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

const schema = z.object({
  id: z.string(),
  name: z.string().min(1).max(20),
  introduction: z.string().max(100).nullable(),
  x: z.string().nullable(),
  github: z.string().nullable(),
  zenn: z.string().nullable(),
  qiita: z.string().nullable(),
  note: z.string().nullable()
})

type Props = {
  userId: string
  name: string
  introduction: string | null
  github: string | null
  x: string | null
  zenn: string | null
  qiita: string | null
  note: string | null
}

// TODO 認可
export async function updateProfile(props: Props) {
  try {
    const session = await getServerSession(authOptions)
    const parsed = schema.parse({
      id: props.userId,
      name: props.name,
      introduction: props.introduction,
      x: props.x,
      github: props.github,
      zenn: props.zenn,
      qiita: props.qiita,
      note: props.note
    })
    const { id } = parsed
    if (!session || session.user.id !== id) return { message: 'error' }
    const result = await db.user.update({
      where: {
        id
      },
      data: parsed
    })
    return { message: 'success' }
  } catch (err) {
    console.log(err)
    return { message: 'error' }
  }
}

export async function updateUserIcon({ userId, imageUrl }: { userId: string; imageUrl: string }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.id !== userId) return { message: 'error' }
    const user = await db.user.update({
      where: {
        id: userId
      },
      data: {
        image: imageUrl
      }
    })
    return { message: 'success' }
  } catch (err) {
    console.log(err)
    return { message: 'error' }
  }
}
