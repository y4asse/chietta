import ScrollDetect from '@/components/scroll/ScrollDetect'
import Posts from '@/components/tech/Posts'
import { getPost } from '@/server/getPosts'

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const offset = 0
  const posts = await getPost('feedDetail', { offset, feedId: id })
  if (!posts) return
  return (
    <div className="max-w-[1000px] mx-auto">
      <ScrollDetect type="feedDetail" feedId={id}>
        <Posts posts={posts} />
      </ScrollDetect>
    </div>
  )
}

export default Page
