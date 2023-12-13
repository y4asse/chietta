import { rssParser } from '@/utils/builder'

// nullまたはFeedItemを返す
export const getFeedItem = async (url: string) => {
  const feedItem = await rssParser.parseURL(url).catch((err) => {
    console.log(err)
    return null
  })
  return feedItem as {
    items: { title: string; link: string; pubDate: string; isoDate: string }[]
    title: string
  } | null
}
