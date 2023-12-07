import Input from '@/components/feeds/create/Input'
import React from 'react'
import FeedListLink from '@/components/LinkButton/FeedListLink'

const Page = () => {
  return (
    <div className="max-w-[1000px] mx-auto">
      <h1 className="text-center text-3xl font-bold my-5">フィードを新規登録</h1>
      <div className="text-right">
        <FeedListLink />
      </div>
      <div className="px-5 py-5 shadow bg-[white] rounded-xl mt-5">
        <Input />
      </div>
    </div>
  )
}

export default Page
