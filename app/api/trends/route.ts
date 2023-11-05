import { addOgp } from '@/server/addOgp'
import { Trends } from '@prisma/client'
import { NextRequest } from 'next/server'

export const revalidate = 60 * 60 // 1時間

export const GET = async (req: NextRequest) => {
  const offsetString = req.nextUrl.searchParams.get('offset')
  const offset = offsetString ? parseInt(offsetString) : 0 // 不正な値の時0になる
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trendsFromDb?offset=${offset}`, {
    next: { revalidate: 60 * 30 } // 30分
  })
  if (!res.ok) {
    return Response.json({ message: 'サーバーエラー' }, { status: 500 })
  }
  const articles = (await res.json()).result as Trends[]
  const returnPosts = await addOgp(articles)
  return Response.json(returnPosts)
}
