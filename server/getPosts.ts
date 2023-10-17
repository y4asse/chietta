import { ReturnPost } from '@/app/api/post/route'

export const getLatestPosts = async (offset: number, q?: string): Promise<ReturnPost[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post?offset=${offset}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 5 * 60 } // 5分に一回更新する
    })
    if (!res.ok) {
      console.log('Http Error')
      console.log('status: ' + res.status)
      console.log('statusText: ' + res.statusText)
      throw new Error(`HTTP error! Status: ${res.statusText}`)
    }
    const posts = (await res.json()) as ReturnPost[]
    return posts
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getSearchPosts = async (offset: number, q: string): Promise<ReturnPost[] | null> => {
  try {
    const queryURL = new URL(`${process.env.NEXT_PUBLIC_API_URL}/search?q=${q}&offset=${offset}`)
    const res = await fetch(queryURL, {
      cache: 'force-cache'
    })
    if (!res.ok) {
      console.log('Http Error')
      console.log('status: ' + res.status)
      console.log('statusText: ' + res.statusText)
      throw new Error(`HTTP error! Status: ${res.statusText}`)
    }
    const posts = (await res.json()) as ReturnPost[]
    return posts
  } catch (error) {
    console.log(error)
    return null
  }
}
