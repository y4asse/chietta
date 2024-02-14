'use client'

import LayoutTitle from '@/components/layout/LayoutTitle'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BiSolidCategoryAlt } from 'react-icons/bi'

const TitleSection = () => {
  const list = [
    { name: 'すべて', path: '' },
    { name: 'フォロー中', path: '/following' }
  ]
  const pathname = usePathname()
  return (
    <>
      <LayoutTitle text="新着の企業ブログ" />
      <div className="flex justify-center gap-3 items-center my-7">
        {list.map((item) => {
          const isActive = '/feeds' + item.path === pathname
          return (
            <Link
              key={item.name}
              href={`/feeds${item.path}`}
              className={`py-1 px-3 rounded-xl border border-[#c7c7c7] dark:border-gray bg-white dark:bg-lightDark dark:bg-lightDark ${
                isActive ? 'bg-primary dark:bg-primary text-white border-none' : ''
              }`}
            >
              {item.name}
            </Link>
          )
        })}
      </div>
      <div className="text-center mb-3">
        <Link href="/feeds/list/0" className="py-1 px-3 rounded-xl text-primary font-bold">
          一覧を見る
          <BiSolidCategoryAlt className="inline ml-1" />
        </Link>
      </div>
    </>
  )
}

export default TitleSection
