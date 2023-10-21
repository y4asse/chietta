import { db } from '@/server/db'
import { getTechBlog } from '@/server/getTechBlog'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.MY_SECRET_TOKEN) {
    return Response.json({ error: 'invalid token' }, { status: 401 })
  }
  const lists = ['cyber', 'mercari', 'lineYahoo', 'cybozu', 'freee', 'dena'] as const
  const articles = [] as { url: string; createdAt: Date; title: string }[]
  for (const company of lists) {
    const companyArticles = await getTechBlog(company)
    articles.push(...companyArticles)
  }
  const { count } = await db.companyArticle.createMany({
    data: articles,
    skipDuplicates: true
  })
  return Response.json({ count })
}
