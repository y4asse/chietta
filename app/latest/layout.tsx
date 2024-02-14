import TitleSection from '@/components/latest/TitleSection'
import LayoutTitle from '@/components/layout/LayoutTitle'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: '新着の記事 | Chietta'
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen min-w-[300px] bg-main dark:bg-lightDark dark:text-white items-center py-5">
      <LayoutTitle text="新着の記事" />
      <TitleSection />
      {children}
    </main>
  )
}

export default Layout
