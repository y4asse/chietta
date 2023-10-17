import { ReturnPost } from '@/app/api/post/route'
import { Post } from '@prisma/client'
import { getOgp } from './getOgp'

export const addOgp = async (posts: Post[]): Promise<ReturnPost[]> => {
  const startTime = Date.now()
  let array: ReturnPost[] = []

  // getOgpがキャッシュされてる
  const ogpPromises = posts.map((post) => getOgp(post.url))
  const ogps = await Promise.all(ogpPromises)
  posts.map((post, i) => {
    const ogp = ogps[i]
    if (!ogp) return
    if (!ogp.ogImage) return
    if (ogp.ogImage.length < 1) return
    const image_url = ogp.ogImage[0].url
    array = [...array, { ...post, image_url }]
  })

  const endTime = Date.now()
  console.log('[addOgp] return ogp = ' + (endTime - startTime) + 'ms')
  return array
}
