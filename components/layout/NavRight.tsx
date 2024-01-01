'use client'

import Link from 'next/link'
import React from 'react'
import UserIcon from './UserIcon'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'
import QuestionButton from './QuestionButton'
import { usePathname } from 'next/navigation'

const NavRight = () => {
  const { data: session, status } = useSession()
  const pathName = usePathname()
  if (status === 'loading') return
  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
      <div className="flex gap-1 md:gap-3 items-center">
        <Link className={`text-xl ${pathName === '/search' ? 'text-[black]' : 'text-gray'}`} href="/search">
          <FaSearch />
        </Link>
        {session ? <UserIcon session={session} /> : <QuestionButton />}
        <Link
          href={session ? '/mypage/createPost' : '/login'}
          className="bg-primary text-[white] rounded-lg px-3 py-1 md:py-2 text-normal font-semibold md:text-lg"
        >
          {session ? '記事を共有' : 'ログイン'}
        </Link>
      </div>
    </motion.div>
  )
}

export default NavRight
