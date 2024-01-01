import FollowList from '@/components/mypage/follow/FollowList'
import Spinner from '@/components/search/Spinner'
import { Suspense } from 'react'

const Followers = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<Spinner />}>
      <FollowList type="followers" userName={params.id} />
    </Suspense>
  )
}

export default Followers
