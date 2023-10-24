export type PostItem = {
  id?: string
  title: string
  url: string
  createdAt: Date
  image_url: string
  likedCount?: number
}

interface WithIsViewd<T> {
  isViewd: boolean
}
