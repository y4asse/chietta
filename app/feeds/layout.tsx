import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '新着の企業ブログ | Chietta'
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="min-h-screen min-w-[300px] bg-main items-center py-5">{children}</main>
}

export default Layout
