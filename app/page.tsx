import WrapContainer from '@/components/layout/WrapContainer'
import ScrollDetect from '@/components/scroll/ScrollDetect'
import Posts from '@/components/tech/Posts'
import { getPost } from '@/server/getPosts'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

const Home = async () => {
  const offset = 0
  const data = await getServerSession(authOptions)
  const userId = data ? data.user.id : null
  const posts = await getPost('trends', { offset, userId })
  if (!posts) return <WrapContainer>error</WrapContainer>
  return (
    <main className="min-h-screen min-w-[300px] bg-[#fffafa] items-center py-10">
      <h1 className="text-center text-3xl font-bold my-5">トレンド記事</h1>
      <ScrollDetect type="trends" q="">
        <Posts posts={posts} />
      </ScrollDetect>
    </main>
  )
}

export default Home
