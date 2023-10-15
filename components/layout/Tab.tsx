'use client'

import React from 'react'
import WrapContainer from './WrapContainer'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Tab = () => {
  const pathname = usePathname()
  console.log(pathname)
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
    }
  ]
  return (
    <nav className="sticky top-0 z-10 bg-[white] py-3">
      <WrapContainer>
        <ul className="flex text-xl text-gray gap-7 items-center font-bold">
          {list.map((item, index) => (
            <li key={index} className={pathname === item.path ? `border-b-[3px]  border-primary` : ''}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </WrapContainer>
    </nav>
  )
}

export default Tab
