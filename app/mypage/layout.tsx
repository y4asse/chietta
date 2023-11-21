import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className=" min-w-[300px] bg-main items-center">{children}</main>
}

export default Layout
