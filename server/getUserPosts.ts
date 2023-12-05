import { PostsWithData } from '@/app/api/userPost/route'

export const getUserPosts = async () => {
  try {
    const revalidate = 0
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userPost`, {
      next: { revalidate }
    })
    if (!res.ok) {
      throw new Error('エラーが発生しました')
    }
    const data = await res.json()
    return data as PostsWithData
  } catch (err) {
    return null
  }
}
