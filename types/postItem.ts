import { Feed } from '@prisma/client'

export type PostItemType = {
  id?: string
  title: string
  url: string
  createdAt: string
  image_url: string | null
  likedCount?: number
  feed?: Feed
}

interface WithIsViewd<T> {
  isViewd: boolean
}
