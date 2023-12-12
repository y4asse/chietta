import LayoutComponent from '@/components/layout/LayoutComponent'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Gtag from '@/utils/gtag'
import AuthProvider from '@/components/provider/authProvider'
import JotaiProvider from '@/components/provider/jotaiProvider'
import ClientProvider from '@/components/provider/ClientProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chietta | 技術記事プラットフォーム',
  description:
    'Chiettaはエンジニアのための技術記事をまとめたサービスです。様々な媒体の記事を見たり、検索することができます。'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Chietta | 技術記事プラットフォーム" />
      <meta
        property="og:description"
        content="Chiettaはエンジニアのための技術記事をまとめたサービスです。様々な媒体の記事を見たり、検索することができます。"
      />
      <meta property="og:url" content="https://chietta.app" />
      <meta property="og:site_name" content="Chietta | 技術記事プラットフォーム" />
      <meta
        property="og:image"
        content="https://firebasestorage.googleapis.com/v0/b/cheeta-38f77.appspot.com/o/ogp.png?alt=media&token=872105da-5e76-41bb-b3b4-4cc4b0f96e29"
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@yAisse" />
      <Gtag />
      <body className={inter.className}>
        <AuthProvider>
          <JotaiProvider>
            <ClientProvider>
              <LayoutComponent>{children}</LayoutComponent>
            </ClientProvider>
          </JotaiProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
