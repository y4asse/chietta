import React from 'react'
import WrapContainer from './WrapContainer'
import Link from 'next/link'
import Tab from './Tab'

const Header = () => {
  return (
    <>
      <nav className=" bg-[white] ">
        <WrapContainer>
          <div className="flex items-center justify-between py-2">
            <Link className=" text-3xl font-extrabold" href="/">
              Chietta
            </Link>
          </div>
        </WrapContainer>
      </nav>
      <Tab />
    </>
  )
}

export default Header
