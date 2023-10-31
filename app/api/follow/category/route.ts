import { db } from '@/server/db'
import { z } from 'zod'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get('user_id')
  if (userId === null) {
    return Response.json({ message: '不正なリクエスト' }, { status: 400 })
  }
  const result = await db.followCategory.findMany({
    where: {
      user_id: userId
    },
    include: {
      postCategory: true
    }
  })
  console.log(result)
  return Response.json(result)
}

export const POST = async (req: NextRequest) => {
  const schema = z.object({
    user_id: z.string(),
    post_category_id: z.number()
  })
  const body = await req.json()
  const ret = schema.safeParse(body)
  if (!ret.success) {
    return Response.json({ message: ret.error })
  }
  const { user_id, post_category_id } = ret.data

  // 認可
  const token = await getToken({ req })
  if (token === null || token.sub !== user_id) {
    return Response.json({ message: '不正なリクエスト' }, { status: 400 })
  }
  try {
    const result = await db.followCategory.create({
      data: {
        user_id,
        post_category_id
      }
    })
    return Response.json(result)
  } catch (e) {
    return Response.json({ message: '既にフォローしています' }, { status: 400 })
  }
}

export const DELETE = async (req: NextRequest) => {
  const schema = z.object({
    user_id: z.string(),
    post_category_id: z.number()
  })
  const body = await req.json()
  const ret = schema.safeParse(body)
  if (!ret.success) {
    return Response.json({ message: ret.error })
  }
  const { user_id, post_category_id } = ret.data

  // 認可
  const token = await getToken({ req })
  if (token === null || token.sub !== user_id) {
    return Response.json({ message: '不正なリクエスト' }, { status: 400 })
  }
  try {
    const result = await db.followCategory.delete({
      where: {
        user_id_post_category_id: {
          user_id,
          post_category_id
        }
      }
    })
    return Response.json(result)
  } catch (e) {
    return Response.json({ message: '既にフォローしています' }, { status: 400 })
  }
}
