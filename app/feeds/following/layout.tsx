import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'フォロー中のフィード | Chietta'
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default Layout
