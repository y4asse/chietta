import LayoutTitle from '@/components/layout/LayoutTitle'
import Spinner from '@/components/search/Spinner'
import UserPostsServer from '@/components/userPost/UserPostsServer'
import { Suspense } from 'react'

const Post = async () => {
  return (
    <>
      <LayoutTitle text="タイムライン" />
      <Suspense fallback={<Spinner />}>
        <UserPostsServer />
      </Suspense>
    </>
  )
}

export default Post
