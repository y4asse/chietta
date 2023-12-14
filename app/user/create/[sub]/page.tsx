import SubmitButton from '@/components/feeds/create/SubmitButton'
import { db } from '@/server/db'
import { notFound } from 'next/navigation'
import FormInput from '@/components/user/create/FormInput'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/server/auth'

const Page = async ({ params }: { params: { sub: string } }) => {
  const session = await getServerSession(authOptions)
  const sessionUser = session!.user
  if (sessionUser.id !== params.sub) return notFound()
  const user = await db.user.findUnique({ where: { id: params.sub } })
  if (!user || user.idCreatedByUser) {
    return notFound()
  }
  return (
    <div className="bg-main min-h-screen">
      <div className="mx-auto max-w-[1000px] flex justify-center items-center pt-20 flex-col px-3">
        <h1 className="text-2xl font-bold text-center">アカウントの作成</h1>
        <h2 className="text-xl font-bold mt-20">{user?.name}</h2>
        <img
          className="w-[100px] rounded-full border border-lightGray mt-5"
          src={user && user.image ? user.image : ''}
          alt="ユーザアイコン"
        />
        <FormInput user={user} />
      </div>
    </div>
  )
}

export default Page
