import { User, UserPost } from '@prisma/client'
import { WithImageUrl } from './addOgp'

export const getUser = async (userId: string, revalidate: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user?user_id=${userId}`, {
    next: { revalidate }
  })
  if (!res.ok) {
    return null
  }
  const user = (await res.json()) as { user: User; postsWithOgp: WithImageUrl<UserPost>[] }
  return user
}
