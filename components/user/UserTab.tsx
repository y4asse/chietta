'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaBookOpen } from 'react-icons/fa6'
import { FaBookmark } from 'react-icons/fa'

const UserTab = ({ idCreatedByUser }: { idCreatedByUser: string }) => {
  const list = [
    { name: '記事一覧', path: `/${idCreatedByUser}`, icon: <FaBookOpen /> },
    { name: 'ブックマーク', path: `/${idCreatedByUser}/bookmark`, icon: <FaBookmark /> }
  ]
  const pathname = usePathname()
  return (
    <div className="max-w-[1000px] text-sm md:text-base mx-auto my-5 px-3 flex gap-3 flex-wrap">
      {list.map((item, i) => {
        return (
          <Link
            href={item.path}
            key={i}
            className={`rounded-full overflow-hidden px-3 py-1   flex justify-center items-center gap-1 ${
              pathname === item.path ? 'bg-primary text-white' : 'text-gray dark:text-white border border-[#afafaf]'
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        )
      })}
    </div>
  )
}

export default UserTab
