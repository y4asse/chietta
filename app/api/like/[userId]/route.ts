import { db } from '@/server/db'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextRequest } from 'next/server'
import z, { ZodError } from 'zod'

export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  const { userId } = params
  try {
    const likes = await db.like.findMany({
      where: { user_id: userId }
    })
    return Response.json({ likes })
  } catch (e) {
    console.log(e)
    return Response.json({ message: 'Internal server error' }, { status: 500 })
  }
}

const schema = z.object({
  user_post_id: z.string({
    required_error: 'user_post_id is required',
    invalid_type_error: 'user_post_id must be a string'
  })
})

export const POST = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  try {
    const body = await req.json()
    const { user_post_id } = schema.parse(body)
    const { userId } = params
    const like = await db.like.create({
      data: {
        user_id: userId,
        user_post_id: user_post_id
      }
    })
    return Response.json({ like })
  } catch (e) {
    console.log(e)
    if (e instanceof ZodError) {
      return Response.json({ message: e.issues[0].message }, { status: 400 })
    }
    if (e instanceof PrismaClientKnownRequestError) {
      return Response.json({ message: e.message }, { status: 400 })
    }
    return Response.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export const DELETE = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  try {
    const body = await req.json()
    const { user_post_id } = schema.parse(body)
    const { userId } = params
    const like = await db.like.delete({
      where: {
        user_id_user_post_id: {
          user_id: userId,
          user_post_id: user_post_id
        }
      }
    })
    return Response.json({ like })
  } catch (e) {
    console.log(e)
    if (e instanceof ZodError) {
      return Response.json({ message: e.issues[0].message }, { status: 400 })
    }
    if (e instanceof PrismaClientKnownRequestError) {
      return Response.json({ message: e.message }, { status: 400 })
    }
    return Response.json({ message: 'Internal server error' }, { status: 500 })
  }
}
