import { getOgp } from './getOgp'

export interface HasUrl {
  url: string
}

// &演算子はTypeScriptの交差型（Intersection Types）を表し、複数の型を一つに合成する
export type WithImageUrl<T> = T & { image: string | null }

export const addOgp = async <T extends HasUrl>(posts: T[]): Promise<WithImageUrl<T>[]> => {
  const startTime = Date.now()
  let array: WithImageUrl<T>[] = []

  // getOgpがキャッシュされてる
  const ogpPromises = posts.map((post) => getOgp(post.url))
  const ogps = await Promise.all(ogpPromises)
  posts.map((post, i) => {
    const ogp = ogps[i]
    if (!ogp || !ogp.ogImage || ogp.ogImage.length < 1) {
      array = [...array, { ...post, image: null }]
    } else {
      const image = ogp.ogImage[0].url
      array = [...array, { ...post, image }]
    }
  })

  const endTime = Date.now()
  console.log('[addOgp] return ogp = ' + (endTime - startTime) + 'ms')
  return array
}
