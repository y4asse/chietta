import WrapContainer from '@/components/layout/WrapContainer'
import ScrollDetect from '@/components/scroll/ScrollDetect'
import Posts from '@/components/tech/Posts'
import { getPost } from '@/server/getPosts'

const Latest = async () => {
  const offset = 0
  const posts = await getPost('latest', { offset })
  if (!posts) return <WrapContainer>error</WrapContainer>
  return (
    <ScrollDetect type="latest" q="">
      <Posts posts={posts} />
    </ScrollDetect>
  )
}

export default Latest
