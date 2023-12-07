import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '退会する | Chietta'
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default Layout
