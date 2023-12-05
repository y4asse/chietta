export type PostItemType = {
  id?: string
  title: string
  url: string
  createdAt: string
  image_url: string
  likedCount?: number
}

interface WithIsViewd<T> {
  isViewd: boolean
}
