import { JSDOM } from 'jsdom'
import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 * 7 }) // 1週間

export const getFeedLink = async (url: string): Promise<string | null> => {
  try {
    const cacheKey = 'feedLink' + url
    const cachedFeedLink = cache.get(cacheKey) as string | undefined
    if (cachedFeedLink) {
      console.log('cach hit: ' + cachedFeedLink)
      return cachedFeedLink
    }
    new URL(url)
    const res = await fetch(url)
    if (!res.ok) throw new Error('レスポンスが正常ではありません')
    const text = await res.text()
    const dom = new JSDOM(text)
    const document = dom.window.document
    const feedLinkElement: HTMLLinkElement | null =
      document.querySelector('link[type="application/rss+xml"]') ||
      document.querySelector('link[type="application/atom+xml"]')
    if (!feedLinkElement) throw new Error('フィードが見つかりません')
    const feedLink = feedLinkElement.href
    cache.set(cacheKey, feedLink)
    console.log(feedLink)
    return feedLink
  } catch (e) {
    console.log('Error in getFeedLink')
    console.error(e)
    return null
  }
}
