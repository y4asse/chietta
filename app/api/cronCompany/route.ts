import { db } from '@/server/db'
import { rssParser } from '@/utils/builder'
import { CompanyArticle } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.MY_SECRET_TOKEN) {
    return Response.json({ error: 'invalid token' }, { status: 401 })
  }

  const companies = await db.company.findMany({})
  for (const company of companies) {
    const { feedUrl, id } = company
    const feedItem = await rssParser.parseURL(feedUrl)
    const { items } = feedItem as { items: { title: string; link: string; pubDate: string }[] }
    const insertData = items.map(
      (item) =>
        ({
          title: item.title,
          url: item.link,
          createdAt: new Date(item.pubDate),
          company_id: id
        } as CompanyArticle)
    )
    const { count } = await db.companyArticle.createMany({
      data: insertData,
      skipDuplicates: true
    })
    console.log(`${company.name}: ${count}`)
  }
  return Response.json({})
}
