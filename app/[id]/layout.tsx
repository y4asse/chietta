import Profile from '@/components/mypage/Profile'
import UserTab from '@/components/user/UserTab'
import { authOptions } from '@/server/auth'
import { db } from '@/server/db'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const user = await db.user.findUnique({
    where: { idCreatedByUser: params.id }
  })
  return {
    title: user ? user.name + 'さんのページ | Chietta' : 'Chietta | 技術記事プラットフォーム',
    description: user
      ? user.introduction
      : 'Chiettaはエンジニアのための技術記事をまとめたサービスです。様々な媒体の記事を見たり、検索することができます。',
    openGraph: {
      images: user ? (user.image ? user.image : undefined) : undefined
    }
  }
}

const Layout = async ({ children, params }: { children: React.ReactNode; params: { id: string } }) => {
  const session = await getServerSession(authOptions)
  const sessionUser = session ? session.user : null
  const { id } = params
  const user = await db.user.findUnique({
    where: { idCreatedByUser: id },
    include: {
      UserPost: {
        include: {
          _count: {
            select: { like: true }
          },
          user: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      },
      Followers: true,
      Follow: true
    }
  })
  if (!user) return notFound()
  return (
    <div className="pt-10 min-h-screen">
      <Profile user={user} sessionUser={sessionUser} />
      <hr className="max-w-[1000px] mx-auto text-lightGray px-5 w-[95%]" />
      <UserTab idCreatedByUser={user.idCreatedByUser || ''} />
      {children}
    </div>
  )
}

export default Layout
