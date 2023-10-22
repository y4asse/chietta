import React from 'react'
import WrapContainer from './WrapContainer'
import Tab from './Tab'
import NavRight from './NavRight'
import NavLeft from './NavLeft'

const Header = () => {
  return (
    <>
      <nav className=" bg-[white] py-2">
        <WrapContainer>
          <div className="flex justify-between items-center">
            <NavLeft />
            <NavRight />
          </div>
        </WrapContainer>
      </nav>
      <Tab />
    </>
  )
}

export default Header
