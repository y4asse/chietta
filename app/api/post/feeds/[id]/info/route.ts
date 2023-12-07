import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { NextRequest, NextResponse } from 'next/server'

//フィードのIDをもとに、そのフィードの情報を取得する
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params
  const info = await getInfoFromDb({ id })
  return Response.json({ info })
}

const getInfoFromDb = async ({ id }: { id: string }) => {
  const startTimeline = Date.now()
  const info = await db.feed.findUnique({
    where: { id }
  })
  const endTimeline = Date.now()
  console.log('[getPostsFromDb] get posts = ' + (endTimeline - startTimeline) + 'ms')
  return info
}
