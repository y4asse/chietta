import { db } from '@/server/db'
import { NextRequest } from 'next/server'

export const GET = async (req: NextRequest) => {
  const result = await db.postCategory.findMany({})
  return Response.json(result)
}
