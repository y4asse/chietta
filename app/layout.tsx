import LayoutComponent from '@/components/layout/LayoutComponent'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Gtag from '@/utils/gtag'
import AuthProvider from '@/components/provider/authProvider'
import JotaiProvider from '@/components/provider/jotaiProvider'
import ClientProvider from '@/components/provider/ClientProvider'
import ValidateUser from '@/utils/ValidateUser'

const inter = Inter({ subsets: ['latin'] })

const title = 'Chietta | 技術記事プラットフォーム'
const description =
  'Chiettaはエンジニアのための技術記事プラットフォームです。複数の技術記事サイトや企業ブログなどをまとめた無料のサービスです。様々な媒体の記事を見たり、検索することができます。またアカウント連携することで、Qiita、Zenn、noteなどであなたがこれまで書いた記事をまとめて見ることができます。'
const images =
  'https://firebasestorage.googleapis.com/v0/b/cheeta-38f77.appspot.com/o/ogp.png?alt=media&token=872105da-5e76-41bb-b3b4-4cc4b0f96e29'
const url = 'https://chietta.app'
const type = 'website'
const locale = 'ja_JP'

export const metadata: Metadata = {
  metadataBase: new URL('https://chietta.app'),
  title,
  description,
  openGraph: {
    type,
    url,
    title,
    description,
    images,
    siteName: title,
    locale
  },
  twitter: {
    site: '@yAisse',
    card: 'summary'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href={`${process.env.NEXT_PUBLIC_FRONT_URL}/manifest.json`} />
        <link rel="apple-touch-icon" href={`${process.env.NEXT_PUBLIC_FRONT_URL}/icon.png`} />
        <meta name="theme-color" content="#fff" />
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_FRONT_URL}/favicon.ico`} />
      </head>
      <Gtag />
      <body className={inter.className}>
        <AuthProvider>
          <JotaiProvider>
            <ClientProvider />
            <ValidateUser />
            <LayoutComponent>{children}</LayoutComponent>
          </JotaiProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
