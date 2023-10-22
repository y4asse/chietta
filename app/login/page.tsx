import Logo from '@/components/layout/Logo'
import WrapContainer from '@/components/layout/WrapContainer'
import Link from 'next/link'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
  return (
    <div className="min-h-screen bg-pink pt-10">
      <WrapContainer>
        <div className="bg-[white] py-10 px-5 rounded-xl ">
          <div className="flex justify-center">
            <Logo />
          </div>
          <p className="text-gray mt-10">ログインすると記事のストックなどの様々な機能が使えるようになります。</p>
          <button className="shadow px-3 py-2 rounded-lg flex items-center text-xl mx-auto mt-10 gap-3">
            <FcGoogle />
            <span className="text-lg">Googleでログイン</span>
          </button>
          <hr className="mt-10 text-[#c2c2c2]" />
          <p className="text-gray mt-5">
            プライバシーポリシーについては
            <Link className="underline" href={'/about/privacy'}>
              こちら
            </Link>
            をご確認ください。このサイトについては
            <Link className="underline" href={'/about'}>
              こちら
            </Link>
            をご覧ください。
          </p>
        </div>
      </WrapContainer>
    </div>
  )
}

export default Login
