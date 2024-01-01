'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdOutlineArticle } from 'react-icons/md'
import { FaBookOpen } from 'react-icons/fa6'
const UserTab = ({ idCreatedByUser }: { idCreatedByUser: string }) => {
  const list = [
    { name: '記事一覧', path: `/${idCreatedByUser}`, icon: <FaBookOpen /> },
    { name: '投稿', path: `/${idCreatedByUser}/posts`, icon: <MdOutlineArticle /> }
  ]
  const pathname = usePathname()
  if (!list.some((item) => item.path === pathname)) return
  return (
    <div className="max-w-[1000px] mx-auto my-5 px-3 flex gap-3">
      {list.map((item, i) => {
        return (
          <Link
            href={item.path}
            key={i}
            className={`rounded-full overflow-hidden px-3 py-1   flex justify-center items-center gap-1 ${
              pathname === item.path ? 'bg-primary text-[white]' : 'text-gray border border-[#afafaf]'
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
