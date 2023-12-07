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
      name: 'タイムライン',
      path: '/posts'
    },
    {
      name: 'フィード',
      path: '/feeds'
    }
  ]
  return (
    <nav className="sticky top-0 z-10 bg-[white] py-3 px-2">
      <WrapContainer>
        <div className="flex justify-between items-center">
          <ul className="flex text-lg md:text-xl text-gray gap-5 items-center font-bold flex-nowrap sm:overflow-auto overflow-x-scroll">
            {list.map((item, index) => {
              const isActive = item.path === '/' ? pathname === item.path : pathname === item.path
              return (
                <li key={index} className={`${isActive ? `border-b-[3px]  border-primary` : ''} whitespace-nowrap`}>
                  <Link href={item.path}>{item.name}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </WrapContainer>
    </nav>
  )
}

export default Tab
