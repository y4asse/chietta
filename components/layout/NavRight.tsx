import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import UserIcon from './UserIcon'

const NavRight = async () => {
  const data = await getServerSession(authOptions)
  return (
    <div className="flex gap-3 items-center">
      {data && <UserIcon data={data} />}
      <Link
        href={data ? '/mypage/createPost' : '/login'}
        className="bg-primary text-[white] rounded-lg px-3 py-2 text-lg font-semibold"
      >
        {data ? '記事を共有' : 'ログイン'}
      </Link>
    </div>
  )
}

export default NavRight
