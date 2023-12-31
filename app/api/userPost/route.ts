import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'
import { z } from 'zod'

export const POST = async (req: NextRequest) => {
  const schema = z.object({
    url: z.string(),
    title: z.string(),
    content: z.string(),
    user_id: z.string(),
    isPublic: z.boolean()
  })
  const body = await req.json()
  const ret = schema.safeParse(body)
  if (!ret.success) {
    return Response.json({ message: ret.error })
  }
  const { url, title, content, user_id, isPublic } = ret.data

  // 認可
  const token = await getToken({ req })
  if (token === null || token.sub !== user_id) {
    return Response.json({ message: '不正なリクエスト' }, { status: 400 })
  }

  const result = await db.userPost.create({
    data: {
      url,
      title,
      content,
      user_id,
      isPublic
    }
  })
  return Response.json(result)
}
export const PUT = async (req: NextRequest) => {
  const schema = z.object({
    id: z.string(),
    url: z.string(),
    title: z.string(),
    content: z.string(),
    user_id: z.string(),
    isPublic: z.boolean()
  })
  const body = await req.json()
  const ret = schema.safeParse(body)
  if (!ret.success) {
    return Response.json({ message: ret.error })
  }
  const { url, title, content, user_id, id, isPublic } = ret.data

  // 認可
  const token = await getToken({ req })
  if (token === null || token.sub !== user_id) {
    return Response.json({ message: '不正なリクエスト' }, { status: 400 })
  }

  const result = await db.userPost.update({
    where: {
      id: id,
      user_id: user_id
    },
    data: {
      url,
      title,
      content,
      user_id,
      isPublic
    }
  })
  return Response.json(result)
}

export const DELETE = async (req: NextRequest) => {
  const body = await req.json()
  const schema = z.object({
    post_id: z.string(),
    user_id: z.string()
  })
  const ret = schema.safeParse(body)
  if (!ret.success) {
    return Response.json({ message: ret.error })
  }
  const { post_id, user_id } = ret.data
  // 認可
  const token = await getToken({ req })
  if (token === null || token.sub !== user_id) {
    return Response.json({ message: '不正なリクエスト' }, { status: 400 })
  }

  const result = await db.userPost
    .delete({
      where: {
        id: post_id,
        user_id: user_id
      }
    })
    .catch((e) => {
      console.log(e)
      return Response.json({ message: 'error' }, { status: 400 })
    })
  return Response.json(result)
}
