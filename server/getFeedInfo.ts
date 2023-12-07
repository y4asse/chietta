import { Feed } from '@prisma/client'

export const getFeedInfo = async (feedId: string) => {
  try {
    const revalidate = 60 * 60 * 24 * 30
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/feeds/${feedId}/info`, {
      next: { revalidate }
    })
    if (!res.ok) {
      console.log(res.statusText)
      throw new Error('HTTP error')
    }
    const data = (await res.json()) as { info: Feed }
    return data.info
  } catch (err) {
    console.log(err)
    return null
  }
}
