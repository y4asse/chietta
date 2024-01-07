import LayoutTitle from '@/components/layout/LayoutTitle'
import Spinner from '@/components/search/Spinner'
import FollowingUserActivityList from '@/components/timeline/FollowingActivityList'
import { Suspense } from 'react'

const Post = async () => {
  return (
    <>
      <LayoutTitle text="タイムライン" />
      <Suspense fallback={<Spinner />}>
        <FollowingUserActivityList />
      </Suspense>
    </>
  )
}

export default Post
