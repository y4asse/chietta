import LayoutTitle from '@/components/layout/LayoutTitle'
import SettingTab from '@/components/settings/SettingTab'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ユーザ設定 | Chietta'
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen min-w-[300px] bg-[white] items-center py-5 max-w-[1000px] mx-auto px-3">
      <LayoutTitle text="ユーザ設定" />
      <SettingTab />
      {children}
    </main>
  )
}

export default Layout
