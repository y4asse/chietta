'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BiSolidCategoryAlt } from 'react-icons/bi'

const TitleSection = () => {
  const pathname = usePathname()
  const list = [
    { name: 'すべて', path: '' },
    { name: 'フォロー中のカテゴリ', path: '/category' }
  ]
  return (
    <>
      <div className="flex justify-center gap-3 items-center my-7">
        {list.map((item) => {
          const isActive = '/latest' + item.path === pathname
          return (
            <Link
              key={item.name}
              href={`/latest${item.path}`}
              className={`py-1 px-3 rounded-xl border border-[#c7c7c7] bg-[white] ${
                isActive ? 'bg-primary text-[white] border-none' : ''
              }`}
            >
              {item.name}
            </Link>
          )
        })}
      </div>

      {pathname === '/latest/category' && (
        <div className="text-center mb-3">
          <Link href="/mypage/category" className="py-1 px-3 rounded-xl text-primary font-bold">
            カテゴリ一覧を見る
            <BiSolidCategoryAlt className="inline ml-1" />
          </Link>
        </div>
      )}
    </>
  )
}

export default TitleSection
