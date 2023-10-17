import { NextRequest } from 'next/server'
import ogs from 'open-graph-scraper'

export const GET = async (req: NextRequest) => {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) {
    // bad request
    return Response.json({ message: 'bad request' }, { status: 400 })
  }
  try {
    const { result } = await ogs({ url })
    return Response.json(result)
  } catch (error) {
    console.log('error', url)
    return Response.json({ message: 'error' }, { status: 500 })
  }
}
