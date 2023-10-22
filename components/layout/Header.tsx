import React from 'react'
import WrapContainer from './WrapContainer'
import Link from 'next/link'
import Tab from './Tab'
import Image from 'next/image'

const Header = () => {
  return (
    <>
      <nav className=" bg-[white] ">
        <WrapContainer>
          <div className="flex items-center justify-between py-2 ">
            <Link className=" text-3xl font-extrabold flex items-center gap-2" href="/">
              <Image src={'/img/catCircle.png'} alt="Chiettaのロゴ画像" width={200} height={200} className="w-[30px]" />
              <span>Chietta</span>
            </Link>
          </div>
        </WrapContainer>
      </nav>
      <Tab />
    </>
  )
}

export default Header
