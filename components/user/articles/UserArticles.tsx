import Posts from '@/components/tech/Posts'
import { addOgp } from '@/server/addOgp'
import { db } from '@/server/db'
import { getFeedItem } from '@/server/getFeedItem'
import { getFeedLink } from '@/server/userPage/getFeedLink'
import Image from 'next/image'
import { notFound } from 'next/navigation'

const UserArticles = async ({ id }: { id: string }) => {
  const user = await db.user.findUnique({
    where: { idCreatedByUser: id }
  })
  if (!user) return notFound()
  const userArticles: { title: string; url: string; createdAt: Date }[] = []
  const { qiita, zenn, note, hatena, webSite } = user
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
  const getHatenaFeed = (name: string | null) => {
    if (!name) return null
    const url = `https://${name}.hatenablog.com/rss`
    const feedItem = getFeedItem(url)
    return feedItem
  }
  const getWebsiteFeed = (name: string | null) => {
    if (!name) return null
    const url = name
    const feedItem = getFeedLink(url).then((link) => {
      if (!link) return null
      return getFeedItem(link)
    })
    return feedItem
  }
  const feeds = await Promise.all([
    getQiitaFeed(qiita),
    getZennFeed(zenn),
    getNoteFeed(note),
    getHatenaFeed(hatena),
    getWebsiteFeed(webSite)
  ])
  feeds.map((feed) => {
    feed?.items.map((item) => {
      const createdAt = item.pubDate ? new Date(item.pubDate) : new Date(item.isoDate)
      userArticles.push({
        title: item.title,
        url: item.link,
        createdAt: createdAt
      })
    })
  })
  userArticles.sort((a, b) => {
    if (a.createdAt > b.createdAt) return -1
    if (a.createdAt < b.createdAt) return 1
    return 0
  })
  const articlesWithOgp = await addOgp(userArticles)
  return (
    <div className="bg-white dark:bg-lightDark">
      <div className="max-w-[1000px] mx-auto px-3">
        {articlesWithOgp.length > 0 ? (
          <Posts posts={articlesWithOgp} />
        ) : (
          <div>
            <h2 className="text-center text-2xl font-bold mt-20">記事がありません</h2>
            <Image src={'/img/cat.png'} width={300} height={300} alt="cat" className="mx-auto" />
          </div>
        )}
      </div>
    </div>
  )
}

export default UserArticles
