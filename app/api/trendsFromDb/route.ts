import { db } from '@/server/db'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
  const offsetString = req.nextUrl.searchParams.get('offset')
  const startTime = Date.now()

  const offset = offsetString ? parseInt(offsetString) : 0 // 不正な値の時0になる
  const result = await db.trends.findMany({
    orderBy: { likedCount: 'desc' },
    take: 10,
    skip: offset
  })
  const endTime = Date.now()
  console.log('[getPostsFromRedis] get trends from DB = ' + (endTime - startTime) + 'ms')

  return Response.json({ result })
}
