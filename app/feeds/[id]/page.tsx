import FeedListLink from '@/components/LinkButton/FeedListLink'
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
    <div className="max-w-[1000px] mx-auto">
      <div className="text-right">
        <FeedListLink />
      </div>
      <h1 className="text-xl font-bold">{feed.name}</h1>
    </div>
  )
}

export default Page
