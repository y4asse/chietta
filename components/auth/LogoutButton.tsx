'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

const LogoutButton = () => {
  return (
    <>
      <button
        className="border border-lightGray dark:border-gray px-3 py-2 rounded-lg flex items-center text-xl mx-auto mt-10 gap-3"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        <span className="text-lg">ログアウトする</span>
      </button>
    </>
  )
}

export default LogoutButton
