'use client'

import { Session } from 'next-auth'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { MdLogout } from 'react-icons/md'
import { FaHome } from 'react-icons/fa'

const UserIcon = ({ data }: { data: Session }) => {
  const [isShow, setIsShow] = React.useState(false)
  const handleClick = () => {
    setIsShow(!isShow)
  }
  const list = [
    { name: 'マイページ', path: '/mypage', icon: <FaHome /> },
    { name: 'ログアウト', path: '/logout', icon: <MdLogout /> }
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
        <img src={data.user.image!} alt="ユーザーアイコン" className="rounded-full w-10 h-10 border border-[#dddddd]" />
      </button>
      {isShow && (
        <ul className="shadow rounded-xl p-5 flex flex-col gap-3 absolute z-20 bg-[white] w-[200px] top-full right-0 text-gray">
          {list.map((item) => (
            <li className="flex items-center gap-3 text-xl" key={item.name}>
              {item.icon}
              <Link key={item.name} href={item.path} onClick={() => setIsShow(false)}>
                <span className="text-lg">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserIcon
