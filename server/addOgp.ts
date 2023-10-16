import { ReturnPost } from '@/app/api/post/route'
import { Post } from '@prisma/client'
import { getOgp } from './getOgp'

export const addOgp = async (posts: Post[]): Promise<ReturnPost[]> => {
  const startTime = Date.now()
  let array: ReturnPost[] = []

  // TODO Promise.allにする
  for (const post of posts) {
    const result = await getOgp(post.url)
    if (!result) continue
    if (!result.ogImage) continue
    if (result.ogImage.length < 1) continue
    const image_url = result.ogImage[0].url
    array = [...array, { ...post, image_url }]
  }
  const endTime = Date.now()
  console.log('[addOgp] get all ogp = ' + (endTime - startTime) + 'ms')
  return array
}
