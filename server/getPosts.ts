import { ReturnPost } from '@/app/api/post/route'

export const getPosts = async (offset: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post?offset=${offset}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
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
