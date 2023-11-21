import Logo from '@/components/layout/Logo'
import WrapContainer from '@/components/layout/WrapContainer'
import LoginButton from '@/components/auth/LoginButton'
import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <div className="min-h-screen bg-pink pt-16">
      <WrapContainer>
        <div className="bg-[white] py-10 px-5 rounded-xl max-w-[400px] mx-auto">
          <div className="flex justify-center">
            <Logo />
          </div>
          <p className="text-gray mt-10">ログインすると記事の共有などの様々な機能が使えるようになります。</p>
          <LoginButton />
          <hr className="mt-10 text-[#c2c2c2]" />
          <p className="text-gray mt-5">
            プライバシーポリシーについては
            <Link className="underline" href={'/about/privacy'}>
              こちら
            </Link>
            をご確認ください。このサイトの詳細については
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
