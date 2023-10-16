import WrapContainer from '@/components/layout/WrapContainer'
import ScrollDetect from '@/components/scroll/ScrollDetect'
import Posts from '@/components/tech/Posts'
import { getPosts } from '@/server/getPosts'

export default async function Home() {
  const offset = 0
  const posts = await getPosts(offset)
  if (!posts) return <WrapContainer>error</WrapContainer>
  return (
    <main className="min-h-screen min-w-[300px] bg-[#fffafa] items-center py-10">
      <h1 className="text-center text-3xl font-bold my-5">新着の記事</h1>
      <ScrollDetect>
        <Posts posts={posts} />
      </ScrollDetect>
    </main>
  )
}
