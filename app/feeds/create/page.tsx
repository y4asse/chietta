import Input from '@/components/feeds/create/Input'
import React from 'react'
import FeedListLink from '@/components/LinkButton/FeedListLink'
import Image from 'next/image'
import LayoutTitle from '@/components/layout/LayoutTitle'

const Page = () => {
  return (
    <div className="max-w-[1000px] mx-auto px-3">
      <LayoutTitle text="フィードを新規登録" />
      <div className="text-right">
        <FeedListLink />
      </div>
      <div className="px-5 py-5 shadow bg-[white] rounded-xl mt-5">
        <Input />
      </div>
      <div className="bg-[white] mt-20 border-lightGray border rounded p-5">
        <h2 className="text-xl font-bold text-center">フィードの登録とは？</h2>
        <p className="mt-5">
          ブログサイトに用意されているフィードのURLを登録することで、Chietta上でそのブログをフォローし、最新の記事を確認することができます。
          また、他の人が登録したフィードも見ることができるので、他の人がどんな記事を読んでいるのかも知ることができます。
        </p>
        <Image
          src="/img/aboutFeedFollow.png"
          width={500}
          height={500}
          className="mx-auto mt-5"
          alt="フィードの登録とは"
        />
        <p className="mt-5">お気に入りの企業ブログや個人ブログをフォローして効率よく情報を収集してみましょう！</p>
      </div>
    </div>
  )
}

export default Page
