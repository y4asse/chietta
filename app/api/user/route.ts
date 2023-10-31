import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'
import z from 'zod'

// 誰でも見れる
export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get('user_id')
  if (userId === null) {
    return Response.json({ message: '不正なリクエスト' }, { status: 400 })
  }
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      UserPost: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })
  if (user === null) {
    return Response.json({ message: 'ユーザが見つかりません' }, { status: 404 })
  }
  const posts = user.UserPost
  const postsWithOgp = await addOgp(posts, { allowNull: true })
  return Response.json({ user, postsWithOgp })
}

export const PUT = async (req: NextRequest) => {
  const schema = z.object({
    id: z.string(),
    name: z.string(),
    introduction: z.string()
    // image: z.string() TODO
  })
  const body = await req.json()
  const ret = schema.safeParse(body)
  if (!ret.success) {
    return Response.json({ message: ret.error })
  }
  const { id, name, introduction } = ret.data

  // 認可
  const token = await getToken({ req })
  if (token === null) {
    return Response.json({ message: '不正なリクエスト' }, { status: 400 })
  }
  if (token.sub !== id) {
    return Response.json({ message: '不正なリクエスト' }, { status: 400 })
  }
  const result = await db.user.update({
    where: {
      id: id
    },
    data: {
      name,
      introduction
    }
  })
  return Response.json(result)
}
