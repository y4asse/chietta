import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: '記事を共有 | Chietta'
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default Layout
