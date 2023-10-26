import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import NotFound from '@/app/not-found'
import WrapContainer from '@/components/layout/WrapContainer'
import Inputs from '@/components/mypage/updatePost/Inputs'
import { db } from '@/server/db'
import { getServerSession } from 'next-auth'
import React from 'react'

const UpdatePost = async ({ params }: { params: { id: string } }) => {
  const post = await db.userPost.findUnique({ where: { id: params.id }, include: { user: true } })
  if (!post) {
    return NotFound()
  }
  const session = await getServerSession(authOptions)
  if (session!.user.id !== post?.user_id) {
    // 権限がない場合
    return NotFound()
  }

  return (
    <div>
      <WrapContainer>
        <div className="px-2">
          <Inputs sessionUser={session!.user} post={post} />
        </div>
      </WrapContainer>
    </div>
  )
}

export default UpdatePost
