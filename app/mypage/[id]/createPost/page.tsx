import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import WrapContainer from '@/components/layout/WrapContainer'
import Inputs from '@/components/mypage/createPost/Inputs'
import { getServerSession } from 'next-auth'
import React from 'react'

const CreatePost = async ({ params }: { params: { id: string } }) => {
  const data = await getServerSession(authOptions)
  const sessionUser = data!.user
  return (
    <WrapContainer>
      <Inputs user={sessionUser} />
    </WrapContainer>
  )
}

export default CreatePost
