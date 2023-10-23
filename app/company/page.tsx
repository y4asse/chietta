import WrapContainer from '@/components/layout/WrapContainer'
import ScrollDetect from '@/components/scroll/ScrollDetect'
import Posts from '@/components/tech/Posts'
import { getPost } from '@/server/getPosts'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

const CompanyLatest = async () => {
  const data = await getServerSession(authOptions)
  const userId = data ? data.user.id : null
  const offset = 0
  const posts = await getPost('company', { offset, userId })
  if (!posts)
    return (
      <WrapContainer>
        <div className="text-center">error</div>
      </WrapContainer>
    )
  return (
    <ScrollDetect type="company" q="">
      <Posts posts={posts} />
    </ScrollDetect>
  )
}

export default CompanyLatest
