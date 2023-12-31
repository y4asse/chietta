import TitleSection from '@/components/feeds/list/TitleSection'
import WrapContainer from '@/components/layout/WrapContainer'
import ScrollDetect from '@/components/scroll/ScrollDetect'
import Posts from '@/components/tech/Posts'
import { getPost } from '@/server/getPosts'

const Feeds = async () => {
  const offset = 0
  const posts = await getPost('feeds', { offset })
  if (!posts)
    return (
      <WrapContainer>
        <div className="text-center">error</div>
      </WrapContainer>
    )
  return (
    <>
      <TitleSection />
      <ScrollDetect type="feeds" q="">
        <Posts posts={posts} />
      </ScrollDetect>
    </>
  )
}

export default Feeds
