import { Company } from '@prisma/client'

export type PostItemType = {
  id?: string
  title: string
  url: string
  createdAt: string
  image_url: string
  likedCount?: number
  company?: Company
}

interface WithIsViewd<T> {
  isViewd: boolean
}
