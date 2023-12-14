import Posts from '@/components/tech/Posts'
import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { getFeedItem } from '@/server/getFeedItem'
import { notFound } from 'next/navigation'

const UserArticles = async ({ id }: { id: string }) => {
  const user = await db.user.findUnique({
    where: { idCreatedByUser: id }
  })
  if (!user) return notFound()
  const userArticles: { title: string; url: string; createdAt: string }[] = []
  const { qiita, zenn, note } = user
  const getQiitaFeed = (name: string | null) => {
    if (!name) return null
    const url = `https://qiita.com/${name}/feed`
    const feedItem = getFeedItem(url)
    return feedItem
  }
  const getZennFeed = (name: string | null) => {
    if (!name) return null
    const url = `https://zenn.dev/${name}/feed`
    const feedItem = getFeedItem(url)
    return feedItem
  }
  const getNoteFeed = (name: string | null) => {
    if (!name) return null
    const url = `https://note.com/${name}/rss`
    const feedItem = getFeedItem(url)
    return feedItem
  }
  const feeds = await Promise.all([getQiitaFeed(qiita), getZennFeed(zenn), getNoteFeed(note)])
  feeds.map((feed) => {
    feed?.items.map((item) => {
      const createdAt = item.pubDate ? new Date(item.pubDate) : new Date(item.isoDate)
      userArticles.push({
        title: item.title,
        url: item.link,
        createdAt: createdAt.toString()
      })
    })
  })
  userArticles.sort((a, b) => {
    const aDate = new Date(a.createdAt)
    const bDate = new Date(b.createdAt)
    if (aDate > bDate) return -1
    if (aDate < bDate) return 1
    return 0
  })
  const articlesWithOgp = await addOgp(userArticles)
  return (
    <div className="max-w-[1000px] mx-auto px-3">
      <Posts posts={articlesWithOgp} />
    </div>
  )
}

export default UserArticles
