import TitleSection from '@/components/feeds/list/TitleSection'
import WrapContainer from '@/components/layout/WrapContainer'
import ScrollDetect from '@/components/scroll/ScrollDetect'
import { usePathname } from 'next/navigation'
import React from 'react'

const Page = () => {
  const list = [
    { name: 'すべて', path: '' },
    { name: 'フォロー中', path: '/following' }
  ]
  const pathname = usePathname()
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
