import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const NavRight = async () => {
  const data = await getServerSession(authOptions)
  return (
    <div className="flex gap-3">
      {data && (
        <img src={data.user.image!} alt="ユーザーアイコン" className="rounded-full w-10 h-10 border border-[#dddddd]" />
      )}
      <Link href={'/login'} className="bg-primary text-[white] rounded-lg px-3 py-2 text-lg font-semibold">
        ログイン
      </Link>
    </div>
  )
}

export default NavRight
