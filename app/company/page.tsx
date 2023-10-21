import WrapContainer from '@/components/layout/WrapContainer'
import ScrollDetect from '@/components/scroll/ScrollDetect'
import Posts from '@/components/tech/Posts'
import { getLatestCompanyPosts } from '@/server/getPosts'

const CompanyLatest = async () => {
  const offset = 0
  const posts = await getLatestCompanyPosts(offset)
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
