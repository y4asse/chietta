'use client'

import React from 'react'
import WrapContainer from './WrapContainer'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Tab = () => {
  const pathname = usePathname()
  const list = [
    {
      name: 'トレンド',
      path: '/'
    },
    {
      name: '新着',
      path: '/latest'
    },
    {
      name: '検索',
      path: '/search'
    },
    {
      name: '企業ブログ',
      path: '/company'
    }
  ]
  return (
    <nav className="sticky top-0 z-10 bg-[white] py-3">
      <WrapContainer>
        <ul className="flex flex-wrap text-xl text-gray gap-5 items-center font-bold">
          {list.map((item, index) => {
            const isActive = item.path === '/' ? pathname === item.path : pathname.startsWith(item.path)
            return (
              <li key={index} className={isActive ? `border-b-[3px]  border-primary` : ''}>
                <Link href={item.path}>{item.name}</Link>
              </li>
            )
          })}
        </ul>
      </WrapContainer>
    </nav>
  )
}

export default Tab
