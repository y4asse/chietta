import WrapContainer from '@/components/layout/WrapContainer'
import ScrollDetect from '@/components/scroll/ScrollDetect'

const Category = () => {
  return (
    <WrapContainer>
      <h1 className="text-2xl font-bold text-center py-7">フォロー中のカテゴリの新着記事</h1>
      <ScrollDetect type="followingCategory" initialOffset={0} />
    </WrapContainer>
  )
}

export default Category
