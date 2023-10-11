import { Post } from '@prisma/client'

export const getPosts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!res.ok) {
      console.log('Http Error')
      console.log('status: ' + res.status)
      console.log('statusText: ' + res.statusText)
      throw new Error(`HTTP error! Status: ${res.statusText}`)
    }
    const { posts } = (await res.json()) as { posts: Post[] }
    return posts
  } catch (error) {
    console.log(error)
    return null
  }
}
