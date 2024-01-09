import { getBookmark } from '@/server/api/user/bookmark/getBookmark'
import { getUser } from '@/server/userPage/getUser'
import { NextRequest } from 'next/server'

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params

  //pageの取得
  const page = req.nextUrl.searchParams.get('page')
  const pageInt = parseInt(page || '0')
  if (isNaN(pageInt)) {
    return Response.json({ error: 'page is not number' }, { status: 400 })
  }
  console.log(pageInt)
  if (pageInt < 0 || pageInt > 1000) {
    return Response.json({ error: 'page is out of range' }, { status: 400 })
  }
  if (!id) {
    return Response.json({ error: 'user id is required' }, { status: 400 })
  }

  const user = await getUser(id)
  if (!user) {
    return Response.json({ error: 'user not found' }, { status: 404 })
  }

  const take = 100
  const bookmark = await getBookmark({ idCreatedByUser: id, take, page: pageInt })
  if (!bookmark) {
    return Response.json({ error: 'internal server error' }, { status: 404 })
  }
  const data = bookmark
  return Response.json(data)
}
