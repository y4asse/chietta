import React from 'react'
import WrapContainer from './WrapContainer'
import Link from 'next/link'
import Tab from './Tab'
import Image from 'next/image'
import Logo from './Logo'

const Header = () => {
  return (
    <>
      <nav className=" bg-[white] py-2">
        <WrapContainer>
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-between py-2 ">
              <Link href="/">
                <Logo />
              </Link>
            </div>
            <div className="">
              <Link href={'/login'} className="bg-primary text-[white] rounded-lg px-3 py-2 text-lg font-semibold">
                ログイン
              </Link>
            </div>
          </div>
        </WrapContainer>
      </nav>
      <Tab />
    </>
  )
}

export default Header
