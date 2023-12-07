import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: '投稿を編集 | Chietta'
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default Layout
