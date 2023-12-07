import { db } from '@/server/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const feed = await db.feed.findUnique({
    where: { id }
  })
  if (!feed) return notFound()
  return (
    <div>
      <Link href={'/feeds/list'}>フィード一覧</Link>
      <h1>{feed.name}</h1>
    </div>
  )
}

export default Page
