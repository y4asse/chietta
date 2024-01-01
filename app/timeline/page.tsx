import Spinner from '@/components/search/Spinner'
import UserPostsServer from '@/components/userPost/UserPostsServer'
import { Suspense } from 'react'

const Post = async () => {
  return (
    <>
      <h1 className="text-center text-3xl font-bold my-5">タイムライン</h1>
      <Suspense fallback={<Spinner />}>
        <UserPostsServer />
      </Suspense>
    </>
  )
}

export default Post
