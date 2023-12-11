'use server'

import { db } from '@/server/db'
import { z } from 'zod'

const schema = z.object({
  id: z.string(),
  name: z.string().min(1).max(20),
  introduction: z.string().max(100).nullable(),
  x: z.string().nullable(),
  github: z.string().nullable()
})

type Props = {
  userId: string
  name: string
  introduction: string | null
  github: string | null
  x: string | null
}

export async function updateProfile(props: Props) {
  try {
    const parsed = schema.parse({
      id: props.userId,
      name: props.name,
      introduction: props.introduction,
      x: props.x,
      github: props.github
    })
    const { name, introduction, id, x, github } = parsed
    const result = await db.user.update({
      where: {
        id
      },
      data: {
        name,
        introduction,
        x,
        github
      }
    })
    return { message: 'success' }
  } catch (err) {
    console.log(err)
    return { message: 'error' }
  }
}

export async function updateUserIcon({ userId, imageUrl }: { userId: string; imageUrl: string }) {
  try {
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
