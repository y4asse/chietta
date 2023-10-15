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
            {/* <div className="flex">
              <button className="bg-primary rounded-lg px-5 py-1 text-[white] font-bold mr-3">投稿する</button>
              <img src="/img/cat.png" alt="アイコン画像" width={34} />
            </div> */}
          </div>
        </WrapContainer>
      </nav>
      <Tab />
    </>
  )
}

export default Header
