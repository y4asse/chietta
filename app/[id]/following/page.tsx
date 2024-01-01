import FollowPage from '@/components/mypage/follow/FollowList'
import Spinner from '@/components/search/Spinner'
import { Suspense } from 'react'

const Following = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<Spinner />}>
      <FollowPage type="following" userName={params.id} />
    </Suspense>
  )
}

export default Following
