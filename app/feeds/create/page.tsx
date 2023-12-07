import Input from '@/components/feeds/create/Input'
import React from 'react'
import Link from 'next/link'

const Page = () => {
  return (
    <div className="max-w-[1000px] mx-auto">
      <h1 className="text-center text-3xl font-bold my-5">フィードを新規登録</h1>
      <div className="text-right">
        <Link
          href="/feeds/list"
          className="border border-[#afafaf] px-3 py-1 rounded bg-[white] hover:bg-lightGray duration-200 transition-all"
        >
          フィード一覧
        </Link>
      </div>
      <div className="px-5 py-5 shadow bg-[white] rounded-xl mt-5">
        <Input />
      </div>
    </div>
  )
}

export default Page
