'use client'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="min-h-screen min-w-[300px] bg-main items-center py-10">{children}</main>
}

export default Layout
