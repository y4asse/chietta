import { ReturnPost } from '@/app/api/post/route'
import { Post } from '@prisma/client'
import { getOgp } from './getOgp'

export const addOgp = async (posts: Post[]): Promise<ReturnPost[]> => {
  let array: ReturnPost[] = []

  for (const post of posts) {
    const result = await getOgp(post.url)
    if (!result) continue
    if (!result.ogImage) continue
    if (result.ogImage.length < 1) continue
    const image_url = result.ogImage[0].url
    array = [...array, { ...post, image_url }]
  }
  return array
}
