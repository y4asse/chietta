import WrapContainer from '@/components/layout/WrapContainer'
import ScrollDetect from '@/components/scroll/ScrollDetect'
import Posts from '@/components/tech/Posts'
import { getPost } from '@/server/getPosts'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

const Latest = async () => {
  const data = await getServerSession(authOptions)
  const offset = 0
  const user = data ? data.user : null
  const userId = user ? user.id : null
  const posts = await getPost('latest', { offset, userId: userId })
  if (!posts) return <WrapContainer>error</WrapContainer>
  return (
    <ScrollDetect type="latest" q="">
      <Posts posts={posts} />
    </ScrollDetect>
  )
}

export default Latest
