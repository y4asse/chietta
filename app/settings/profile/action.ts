'use server'

import { db } from '@/server/db'
import { z } from 'zod'

const schema = z.object({
    id: z.string(),
  name: z.string().min(1).max(20),
  introduction: z.string().max(100).nullable()
})

type Props = {
    userId: string
    name: string
    introduction: string | null
}

export async function updateProfile(props: Props) { 
  try {
    const parsed = schema.parse({
      name: props.name,
      introduction: props.introduction,
      id : props.userId
    })
    const { name, introduction, id } = parsed
    const result = await db.user.update({
        where: {
            id
        },
        data: {
            name,
            introduction
        }
    })  
    return { message: 'success' }
  } catch (err) {
    console.log(err)
    return { message: 'error' }
  }
}

export async function updateUserIcon({userId, imageUrl} : {userId: string, imageUrl: string}) {
  try {
    const user = await db.user.update({
      where: {
        id: userId
      },
      data: {
        image:imageUrl
      }
    })
    return { message: 'success' }
  }catch(err) {
    console.log(err)
    return { message: 'error' }
  }
}