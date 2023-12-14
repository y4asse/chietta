import Spinner from '@/components/search/Spinner'
import UserArticles from '@/components/user/articles/UserArticles'
import { Suspense } from 'react'

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <UserArticles id={id} />
      </Suspense>
    </>
  )
}

export default Page
