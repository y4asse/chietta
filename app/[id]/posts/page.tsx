import Spinner from '@/components/search/Spinner'
import UserPostsServer from '@/components/user/posts/userPostsServer'
import { Suspense } from 'react'

const Mypage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  return (
    <div className="w-full px-2">
      <Suspense fallback={<Spinner />}>
        <UserPostsServer id={id} />
      </Suspense>
    </div>
  )
}

export default Mypage
