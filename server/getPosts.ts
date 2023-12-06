import { PostItemType } from '@/types/postItem'

const getLatestPosts = async (offset: number): Promise<PostItemType[] | null> => {
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
    const posts = (await res.json()) as PostItemType[]
    return posts
  } catch (error) {
    console.log(error)
    return null
  }
}
const getLatestCompanyPosts = async (offset: number): Promise<PostItemType[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/feeds?offset=${offset}`, {
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
    const posts = (await res.json()) as PostItemType[]
    return posts
  } catch (error) {
    console.log(error)
    return null
  }
}

const getSearchPosts = async (offset: number, q: string): Promise<PostItemType[] | null> => {
  try {
    const queryURL = new URL(`${process.env.NEXT_PUBLIC_API_URL}/search?q=${q}&offset=${offset}`)
    const res = await fetch(queryURL, {
      cache: 'no-cache'
    })
    if (!res.ok) {
      console.log('Http Error')
      console.log('status: ' + res.status)
      console.log('statusText: ' + res.statusText)
      throw new Error(`HTTP error! Status: ${res.statusText}`)
    }
    const posts = (await res.json()) as PostItemType[]
    return posts
  } catch (error) {
    console.log(error)
    return null
  }
}

const getTrends = async (offset: number): Promise<PostItemType[] | null> => {
  try {
    const queryURL = new URL(`${process.env.NEXT_PUBLIC_API_URL}/trends?offset=${offset}`)
    const res = await fetch(queryURL, {
      next: { revalidate: 60 * 30 } // 30分に一回更新する
    })
    if (!res.ok) {
      console.log('Http Error')
      console.log('status: ' + res.status)
      console.log('statusText: ' + res.statusText)
      throw new Error(`HTTP error! Status: ${res.statusText}`)
    }
    const posts = (await res.json()) as PostItemType[]
    return posts
  } catch (error) {
    console.log(error)
    return null
  }
}

const getFollowingCategoryPosts = async (offset: number, userId: string): Promise<PostItemType[] | null> => {
  try {
    const queryURL = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/post/followingCategory?user_id=${userId}&offset=${offset}`
    )
    const res = await fetch(queryURL, {
      cache: 'no-cache'
    })
    if (!res.ok) {
      console.log('status: ' + res.status)
      console.log('statusText: ' + res.statusText)
      throw new Error(`HTTP error! Status: ${res.statusText}`)
    }
    const posts = (await res.json()) as PostItemType[]
    return posts
  } catch (error) {
    console.log(error)
    return null
  }
}

type Props = {
  offset: number
  userId?: string | null
  q?: string
}

export type Type = 'latest' | 'feeds' | 'search' | 'trends' | 'followingCategory'

export const getPost = async (type: Type, { offset, q, userId }: Props): Promise<PostItemType[] | null> => {
  switch (type) {
    case 'latest':
      return await getLatestPosts(offset)
    case 'feeds':
      return await getLatestCompanyPosts(offset)
    case 'search':
      if (!q) throw new Error('q is not found')
      return await getSearchPosts(offset, q)
    case 'trends':
      return await getTrends(offset)
    case 'followingCategory':
      if (!userId) return null
      return await getFollowingCategoryPosts(offset, userId)
    default:
      throw new Error('type is not found')
  }
}
