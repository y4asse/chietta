import WrapContainer from '@/components/layout/WrapContainer'
import ScrollDetect from '@/components/scroll/ScrollDetect'
import Posts from '@/components/tech/Posts'
import { getLatestPosts } from '@/server/getPosts'

const Home = async () => {
  const offset = 0
  const posts = await getLatestPosts(offset)
  if (!posts) return <WrapContainer>error</WrapContainer>
  return (
    <main className="min-h-screen min-w-[300px] bg-[#fffafa] items-center py-10">
      <h1 className="text-center text-3xl font-bold my-5">トレンド記事</h1>
      <ScrollDetect type="latest" q="">
        <Posts posts={posts} />
      </ScrollDetect>
    </main>
  )
}

export default Home
