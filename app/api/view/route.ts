import { db } from '@/server/db'
import { NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get('user_id')
  const postUrl = req.nextUrl.searchParams.get('post_url')
  if (!userId || !postUrl) return Response.json({ message: 'userIdとpost_urlを入力してください' }, { status: 400 })
  const result = await db.viewHistory
    .create({
      data: {
        user_id: userId,
        post_url: postUrl
      }
    })
    .catch((e) => {
      console.log(e)
    })
  if (!result) return Response.json({ message: 'already exists' })
  return Response.json({ result })
}

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get('user_id')
  if (!userId) return Response.json({ message: 'userIdを入力してください' }, { status: 400 })
  const result = await db.viewHistory.findMany({
    where: {
      user_id: userId
    }
  })
  return Response.json({ result })
}
