import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export const authRequest = async (req: NextRequest, user_id: string) => {
  const token = await getToken({ req })
  if (token === null) {
    return Response.json({ message: '不正なリクエスト' }, { status: 400 })
  }
  if (token.sub !== user_id) {
    return Response.json({ message: '不正なリクエスト' }, { status: 400 })
  }
}
