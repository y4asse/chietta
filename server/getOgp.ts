import { OgObject } from 'open-graph-scraper/dist/lib/types'

export const getOgp = async (url: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ogp?url=${url}`, {
      cache: 'force-cache'
    })
    if (!res.ok) throw new Error('Network response was not ok')
    const data: OgObject = await res.json()
    return data
  } catch (error) {
    return null
  }
}
