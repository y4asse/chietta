'use client'

import { viewHistoryAtom } from '@/jotai/viewHistory'
import { PostItem } from '@/types/postItem'
import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import React, { Dispatch, SetStateAction } from 'react'

const PostLink = ({ post, isViewed }: { post: PostItem; isViewed: boolean }) => {
  const { data: session } = useSession()
  const user = session ? session.user : null
  const [, setViewHistory] = useAtom(viewHistoryAtom)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    if (isViewed) return
    setViewHistory((prev) => [...prev, post.url])
    if (!user) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/view?user_id=${user.id}&post_url=${post.url}`, {
      method: 'POST'
    })
  }
  return (
    <a href={post.url} onClick={handleClick}>
      <img src={post.image_url} alt="image" className=" border-b-2 border-[#e6e6e6] w-full aspect-[16/9]" />
    </a>
  )
}

export default PostLink
