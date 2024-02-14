import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen min-w-[300px] bg-main dark:bg-lightDark dark:text-white items-center">
      {children}
    </main>
  )
}

export default Layout
