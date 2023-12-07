import SettingTab from '@/components/settings/SettingTab'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ユーザ設定 | Chietta'
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen min-w-[300px] bg-[white] items-center py-10 max-w-[1000px] mx-auto px-3">
      <h1 className="text-center text-3xl font-bold my-5">ユーザ設定</h1>
      <SettingTab />
      {children}
    </main>
  )
}

export default Layout
