import TitleSection from '@/components/feeds/list/TitleSection'
import WrapContainer from '@/components/layout/WrapContainer'
import ScrollDetect from '@/components/scroll/ScrollDetect'
import React from 'react'

const Page = () => {
  return (
    <>
      <TitleSection />
      <WrapContainer>
        <ScrollDetect type="followingFeed" initialOffset={0} />
      </WrapContainer>
    </>
  )
}

export default Page
