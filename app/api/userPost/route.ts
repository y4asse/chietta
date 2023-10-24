import { db } from '@/server/db'
import { NextRequest } from 'next/server'
import { z } from 'zod'

export const GET = async () => {
  const result = await db.userPost.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
  return Response.json(result)
}

//TODO 認証されたユーザしかできないようにする

export const POST = async (req: NextRequest) => {
  const schema = z.object({
    url: z.string(),
    title: z.string(),
    comment: z.string(),
    user_id: z.string()
  })
  const body = await req.json()
  const ret = schema.safeParse(body)
  if (!ret.success) {
    return Response.json({ message: ret.error })
  }
  const { url, title, comment, user_id } = ret.data
  const result = await db.userPost.create({
    data: {
      url,
      title,
      comment,
      user_id
    }
  })
  console.log(result)
  return Response.json(result)
}
export const PUT = async (req: NextRequest) => {
  const schema = z.object({
    id: z.string(),
    url: z.string(),
    title: z.string(),
    comment: z.string(),
    user_id: z.string()
  })
  const body = await req.json()
  const ret = schema.safeParse(body)
  if (!ret.success) {
    return Response.json({ message: ret.error })
  }
  const { url, title, comment, user_id, id } = ret.data
  const result = await db.userPost.update({
    where: {
      id: id
    },
    data: {
      url,
      title,
      comment,
      user_id
    }
  })
  console.log(result)
  return Response.json(result)
}
export const DELETE = async (req: NextRequest) => {
  const body = await req.json()
  const schema = z.object({
    post_id: z.string()
  })
  const ret = schema.safeParse(body)
  if (!ret.success) {
    return Response.json({ message: ret.error })
  }
  const { post_id } = ret.data

  const result = await db.userPost
    .delete({
      where: {
        id: post_id
      }
    })
    .catch((e) => {
      console.log(e)
      return Response.json({ message: 'error' }, { status: 400 })
    })
  return Response.json(result)
}
