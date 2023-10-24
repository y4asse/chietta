'use client'

import React from 'react'
import WrapContainer from './WrapContainer'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'

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
      name: '企業ブログ',
      path: '/company'
    },
    {
      name: 'タイムライン',
      path: '/posts'
    }
  ]
  return (
    <nav className="sticky top-0 z-10 bg-[white] py-3">
      <WrapContainer>
        <div className="flex justify-between items-center">
          <ul className="flex text-xl text-gray gap-5 items-center font-bold flex-nowrap sm:overflow-auto overflow-scroll">
            {list.map((item, index) => {
              const isActive = item.path === '/' ? pathname === item.path : pathname.startsWith(item.path)
              return (
                <li key={index} className={`${isActive ? `border-b-[3px]  border-primary` : ''} whitespace-nowrap`}>
                  <Link href={item.path}>{item.name}</Link>
                </li>
              )
            })}
          </ul>
          <Link className="text-gray text-xl" href="/search">
            <FaSearch />
          </Link>
        </div>
      </WrapContainer>
    </nav>
  )
}

export default Tab
