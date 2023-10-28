import WrapContainer from '@/components/layout/WrapContainer'
import Inputs from '@/components/mypage/createPost/Inputs'
import React from 'react'

const CreatePost = async () => {
  return (
    <WrapContainer>
      <div className="px-2">
        <Inputs />
      </div>
    </WrapContainer>
  )
}

export default CreatePost
