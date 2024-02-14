'use client'

import { Session } from 'next-auth'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { MdLogout } from 'react-icons/md'
import { MdSecurity } from 'react-icons/md'
import { MdOutlineQuestionMark } from 'react-icons/md'

import { FaRegBookmark, FaHome } from 'react-icons/fa'
import { BiSolidCategoryAlt } from 'react-icons/bi'

const UserIcon = ({ session }: { session: Session }) => {
  const [isShow, setIsShow] = React.useState(false)
  const handleClick = () => {
    setIsShow(!isShow)
  }
  const listForUser = [
    {
      name: 'マイページ',
      path: session.user.idCreatedByUser ? `/${session.user.idCreatedByUser}` : `user/create/${session.user.id}`,
      icon: <FaHome />
    },
    { name: 'カテゴリ', path: '/mypage/category', icon: <BiSolidCategoryAlt /> },
    {
      name: 'ブックマーク',
      path: `/${session.user.idCreatedByUser}/bookmark`,
      icon: <FaRegBookmark />
    },
    { name: 'ログアウト', path: '/logout', icon: <MdLogout /> }
  ]

  const listForGuest = [
    {
      name: 'Chiettaとは',
      path: '/about',
      icon: <MdOutlineQuestionMark />
    },
    {
      name: 'プライバシー',
      path: '/about/privacy',
      icon: <MdSecurity />
    }
  ]

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!e.target) return
      // クリックした場所が#tabの外側ならisShowをfalseにする
      // closetは自分自身を含むので、!closetで外側を判定できる
      if (!(e.target as HTMLElement).closest('#modal')) {
        setIsShow(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  })
  return (
    <div className="relative" id="modal">
      <button aria-label="タブを表示・非表示にする" onClick={handleClick}>
        <img
          src={session.user.image!}
          alt="ユーザーアイコン"
          className="rounded-full w-8 h-8 md:w-10 md:h-10 border border-[#dddddd]"
        />
      </button>
      {isShow && (
        <div className="shadow rounded-xl flex flex-col absolute z-20 bg-white dark:bg-lightDark w-[200px] top-full right-0 text-gray dark:text-white">
          {session.user.idCreatedByUser && (
            <>
              {listForUser.map((item) => (
                <Link
                  aria-label={item.name}
                  className="flex items-center px-5 py-2 gap-3 text-xl hover:bg-lightGray dark:hover:bg-gray duration-200 transition-all rounded"
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsShow(false)}
                >
                  {item.icon}
                  <span className="text-lg">{item.name}</span>
                </Link>
              ))}
              <div>
                <hr className="text-lightGray mx-1" />
              </div>
            </>
          )}
          {listForGuest.map((item) => (
            <Link
              aria-label={item.name}
              className="flex items-center px-5 py-2 gap-3 text-xl hover:bg-lightGray dark:hover:bg-gray duration-200 transition-all rounded"
              key={item.name}
              href={item.path}
              onClick={() => setIsShow(false)}
            >
              {item.icon}
              <span className="text-lg">{item.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserIcon
