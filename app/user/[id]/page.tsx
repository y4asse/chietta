import MypageClient from '@/components/mypage/MypageClient'
import { getUser } from '@/server/getUser'
import { notFound } from 'next/navigation'
import React from 'react'

const Mypage = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const revalidate = 60 // 1分
  const data = await getUser(id, revalidate)
  if (!data) return notFound()
  const { user, postsWithOgp } = data
  return (
    <div className="flex flex-wrap pt-10">
      <MypageClient postsWithOgp={postsWithOgp} user={user} />
    </div>
  )
}

export default Mypage
