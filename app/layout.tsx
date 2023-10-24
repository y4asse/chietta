import LayoutComponent from '@/components/layout/LayoutComponent'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Gtag from '@/utils/gtag'
import AuthProvider from '@/components/provider/authProvider'
import JotaiProvider from '@/components/provider/jotaiProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chietta | 技術記事プラットフォーム',
  description:
    'Chiettaはエンジニアのための技術記事をまとめたサービスです。様々な媒体の記事を見たり、検索することができます。'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <Gtag />
      <body className={inter.className}>
        <AuthProvider>
          <JotaiProvider>
            <LayoutComponent>{children}</LayoutComponent>
          </JotaiProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
