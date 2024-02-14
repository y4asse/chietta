import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'タイムライン | Chietta'
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen min-w-[300px] bg-main dark:bg-lightDark dark:text-white items-center py-5">
      {children}
    </main>
  )
}

export default Layout
