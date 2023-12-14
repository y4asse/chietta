import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'アカウントの作成 | Chietta'
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

export default Layout
