'use client'

import { signIn, signOut } from 'next-auth/react'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const LoginButton = ({ callbackUrl }: { callbackUrl: string }) => {
  return (
    <>
      <button
        className="shadow px-3 py-2 rounded-lg flex items-center text-xl mx-auto mt-10 gap-3"
        onClick={() => signIn('google', { callbackUrl })}
      >
        <FcGoogle />
        <span className="text-lg">Googleでログイン</span>
      </button>
    </>
  )
}

export default LoginButton
