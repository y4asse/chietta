import { FollowCategory, PostCategory } from '@prisma/client'

export const getAllCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`)
  if (!res.ok) {
    console.log(res.status)
    console.log(res.statusText)
    return null
  }
  const data = (await res.json()) as PostCategory[]
  return data
}

export const getFollowingByUserId = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/follow/category?user_id=${userId}`, {
    cache: 'no-cache'
  })
  if (!res.ok) {
    console.log(res.status)
    console.log(res.statusText)
    return null
  }
  const data = (await res.json()) as (FollowCategory & { postCategory: PostCategory })[]
  return data
}

export const followCategory = async (userId: string, postCategoryId: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/follow/category`, {
    method: 'POST',
    body: JSON.stringify({ user_id: userId, post_category_id: postCategoryId })
  })
  if (!res.ok) {
    console.log(res.status)
    console.log(res.statusText)
    return null
  }
  const data = (await res.json()) as PostCategory
  return data
}

export const deleteFollowCategory = async (userId: string, postCategoryId: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/follow/category`, {
    method: 'DELETE',
    body: JSON.stringify({ user_id: userId, post_category_id: postCategoryId })
  })
  if (!res.ok) {
    console.log(res.status)
    console.log(res.statusText)
    return null
  }
  const data = (await res.json()) as PostCategory
  return data
}
