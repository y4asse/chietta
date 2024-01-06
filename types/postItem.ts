import { Feed } from '@prisma/client'

export type PostItemType = {
  id?: string
  title: string | null
  url: string
  createdAt: Date
  image: string | null
  likedCount?: number
  feed?: Feed
  user_id?: string
}

interface WithIsViewd<T> {
  isViewd: boolean
}
