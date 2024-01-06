import LayoutTitle from '@/components/layout/LayoutTitle'
import WrapContainer from '@/components/layout/WrapContainer'
import ScrollDetect from '@/components/scroll/ScrollDetect'
import Posts from '@/components/tech/Posts'
import { getPost } from '@/server/getPosts'

const Home = async () => {
  const offset = 0
  const posts = await getPost('trends', { offset })
  if (!posts) return <WrapContainer>error</WrapContainer>
  return (
    <main className="min-h-screen min-w-[300px] bg-main items-center py-5">
      <LayoutTitle text="トレンド記事" />
      <ScrollDetect type="trends" q="">
        <Posts posts={posts} />
      </ScrollDetect>
    </main>
  )
}

export default Home
