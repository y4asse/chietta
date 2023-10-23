export type PostItem = {
  id?: string
  title: string
  url: string
  createdAt: Date
  image_url: string
  likedCount?: number
  isViewd: boolean
}

interface WithIsViewd<T> {
  isViewd: boolean
}
