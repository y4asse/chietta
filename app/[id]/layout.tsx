import Profile from '@/components/mypage/Profile'
import UserTab from '@/components/user/UserTab'
import { db } from '@/server/db'
import { getUser } from '@/server/userPage/getUser'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 }) // 1日

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const cacheKey = 'userPageMetadata' + params.id
  const cachedMetadata = cache.get(cacheKey) as Metadata | undefined
  if (cachedMetadata) {
    return cachedMetadata
  }
  const user = await db.user.findUnique({
    where: { idCreatedByUser: params.id }
  })
  const metadata = {
    title: user ? user.name + 'さんのページ | Chietta' : 'Chietta | 技術記事プラットフォーム',
    description: user
      ? user.introduction
      : 'Chiettaはエンジニアのための技術記事をまとめたサービスです。様々な媒体の記事を見たり、検索することができます。',
    openGraph: {
      images: user ? (user.image ? user.image : undefined) : undefined
    }
  }
  cache.set(cacheKey, metadata)
  return metadata
}

const Layout = async ({ children, params }: { children: React.ReactNode; params: { id: string } }) => {
  const { id } = params
  const user = await getUser(id)
  if (!user) return notFound()
  return (
    <div className="bg-white dark:bg-lightDark dark:text-white">
      <div className="pt-5 min-h-screen">
        <Profile user={user} />
        <hr className="max-w-[1000px] mx-auto text-lightGray dark:text-gray px-5 w-[95%]" />
        <UserTab idCreatedByUser={user.idCreatedByUser || ''} />
        {children}
      </div>
    </div>
  )
}

export default Layout
