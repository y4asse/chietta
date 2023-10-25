import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import WrapContainer from '@/components/layout/WrapContainer'
import Inputs from '@/components/mypage/createPost/Inputs'
import { getServerSession } from 'next-auth'
import React from 'react'

// TODO IDの中に入れる必要ない
const CreatePost = async ({ params }: { params: { id: string } }) => {
  const data = await getServerSession(authOptions)
  const sessionUser = data!.user
  return (
    <WrapContainer>
      <div className="px-2">
        <Inputs user={sessionUser} />
      </div>
    </WrapContainer>
  )
}

export default CreatePost
