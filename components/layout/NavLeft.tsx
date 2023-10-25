import Link from 'next/link'
import React from 'react'
import Logo from './Logo'

const NavLeft = () => {
  return (
    <div className="flex items-center justify-between py-2 ">
      <Link href="/">
        <Logo />
      </Link>
    </div>
  )
}

export default NavLeft
