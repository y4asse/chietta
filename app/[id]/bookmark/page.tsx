import ScrollDetection from '@/components/scroll/ScrollDetection'
import { getBookmarkedArticles } from './_actions/actions'

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const getter = getBookmarkedArticles
  return (
    <ScrollDetection props={{ getter, args: { idCreatedByUser: id } }} noContentText="ブックマークがまだありません" />
  )
}

export default Page
