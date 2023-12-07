import TitleSection from '@/components/latest/TitleSection'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: '新着の記事 | Chietta'
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen min-w-[300px] bg-main items-center py-10">
      <h1 className="text-center text-3xl font-bold my-5">新着の記事</h1>
      <TitleSection />
      {children}
    </main>
  )
}

export default Layout
