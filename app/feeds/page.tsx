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
      <h1 className="text-center text-3xl font-bold my-5">新着のフィード記事</h1>

      <ScrollDetect type="feeds" q="">
        <Posts posts={posts} />
      </ScrollDetect>
    </>
  )
}

export default Feeds
