'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaGlobe } from 'react-icons/fa6'
import { FaUserGear } from 'react-icons/fa6'

const SettingTab = () => {
  const list = [
    { name: 'プロフィール', path: '/settings/profile', icon: <FaGlobe /> },
    { name: 'アカウント', path: '/settings/account', icon: <FaUserGear /> }
  ]
  const pathname = usePathname()
  return (
    <div className="p-5 flex gap-3">
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

export default SettingTab
