import WrapContainer from '@/components/layout/WrapContainer'
import ScrollDetect from '@/components/scroll/ScrollDetect'

const Category = () => {
  return (
    <WrapContainer>
      <ScrollDetect type="followingCategory" initialOffset={0} />
    </WrapContainer>
  )
}

export default Category
