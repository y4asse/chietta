import { db } from '@/server/db'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const user = await db.user.findUnique({
    where: { id: params.id }
  })
  return {
    title: user ? user.name + 'さんのページ | Chietta' : 'Chietta | 技術記事プラットフォーム',
    description: user
      ? user.introduction
      : 'Chiettaはエンジニアのための技術記事をまとめたサービスです。様々な媒体の記事を見たり、検索することができます。'
  }
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default Layout
