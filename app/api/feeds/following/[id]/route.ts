import { db } from '@/server/db'
import { NextRequest } from 'next/server'

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params
  try {
    const result = await db.followFeed.findMany({
      where: {
        user_id: id
      },
      include: {
        feed: true
      }
    })
    return Response.json({ result })
  } catch (err) {
    console.log(err)
    return Response.json({ message: 'エラーが発生しました' }, { status: 500 })
  }
}
