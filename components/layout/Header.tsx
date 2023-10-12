import React from 'react'
import WrapContainer from './WrapContainer'
import Link from 'next/link'

const Header = () => {
  return (
    <>
      <nav className=" bg-[white] ">
        <WrapContainer>
          <div className="flex items-center justify-between py-2">
            <Link className=" text-3xl font-extrabold" href="/">
              Chietta
            </Link>
            <div className="flex">
              <button className="bg-primary rounded-lg px-5 py-1 text-[white] font-bold mr-3">投稿する</button>
              <img src="/img/cat.png" alt="アイコン画像" width={34} />
            </div>
          </div>
        </WrapContainer>
      </nav>
      <nav className="sticky top-0 z-10 bg-[white] py-3">
        <WrapContainer>
          {/* TODO CSRにしてpathによってボーダー変える */}
          <ul className="flex text-xl text-gray gap-5 items-center font-bold">
            <li className="border-b-[3px]  border-primary">
              <Link href={'/'}>トレンド</Link>
            </li>
            <li>新着</li>
          </ul>
        </WrapContainer>
      </nav>
    </>
  )
}

export default Header
