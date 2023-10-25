import { db } from '@/server/db'
import { NextRequest } from 'next/server'
import z from 'zod'

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
  const result = await db.user.update({
    where: {
      id: id
    },
    data: {
      name,
      introduction
    }
  })
  console.log(result)
  return Response.json(result)
}
