import { FollowCategory, PostCategory } from '@prisma/client'

export const getAllCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`)
    if (!res.ok) {
      console.log(res.status)
      console.log(res.statusText)
      throw new Error('エラーが発生しました')
    }
    const data = (await res.json()) as PostCategory[]
    return data
  } catch (err) {
    return null
  }
}

export const getFollowingByUserId = async (userId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/follow/category?user_id=${userId}`, {
      cache: 'no-cache'
    })
    if (!res.ok) {
      console.log(res.status)
      console.log(res.statusText)
      throw new Error('エラーが発生しました')
    }
    const data = (await res.json()) as (FollowCategory & { postCategory: PostCategory })[]
    return data
  } catch (err) {
    return null
  }
}

export const followCategory = async (userId: string, postCategoryId: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/follow/category`, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, post_category_id: postCategoryId })
    })
    if (!res.ok) {
      console.log(res.status)
      console.log(res.statusText)
      throw new Error('エラーが発生しました')
    }
    const data = (await res.json()) as PostCategory
    return data
  } catch (err) {
    return null
  }
}

export const deleteFollowCategory = async (userId: string, postCategoryId: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/follow/category`, {
      method: 'DELETE',
      body: JSON.stringify({ user_id: userId, post_category_id: postCategoryId })
    })
    if (!res.ok) {
      console.log(res.status)
      console.log(res.statusText)
      throw new Error('エラーが発生しました')
    }
    const data = (await res.json()) as PostCategory
    return data
  } catch (err) {
    return null
  }
}
