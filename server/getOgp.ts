import { OgObject } from 'open-graph-scraper/dist/lib/types'

export const getOgp = async (url: string) => {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ogp?url=${url}`, {
      cache: 'force-cache'
    }).then((res) => res.json() as OgObject)
    return result
  } catch (error) {
    return null
  }
}
