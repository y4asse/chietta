import LayoutComponent from '@/components/layout/LayoutComponent'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Gtag from '@/utils/gtag'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chietta | 技術記事プラットフォーム',
  description:
    'Chiettaはエンジニアのための技術記事をまとめたサービスです。トレンド記事や新着記事を見たり、検索をすることができます。新しい記事を'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <Gtag />
      <body className={inter.className}>
        <LayoutComponent>{children}</LayoutComponent>
      </body>
    </html>
  )
}
