'use client'

import { viewHistoryAtom } from '@/jotai/viewHistory'
import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import React from 'react'

const PostLink = ({ url, image_url, isViewed }: { url: string; image_url: string | null; isViewed?: boolean }) => {
  const { data: session } = useSession()
  const user = session ? session.user : null
  const [, setViewHistory] = useAtom(viewHistoryAtom)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isViewed) return
    setViewHistory((prev) => [...prev, url])
    if (!user) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/view?user_id=${user.id}&post_url=${url}`, {
      method: 'POST'
    })
  }
  return (
    <a href={url} onClick={handleClick} className="w-[95%] hover:opacity-90" target="_blank">
      <img
        src={
          image_url
            ? image_url
            : 'https://firebasestorage.googleapis.com/v0/b/cheeta-38f77.appspot.com/o/no-image.png?alt=media&token=d7bcb383-25c7-4ab9-8d67-aadf4d14b9ad'
        }
        alt="image"
        className="border-[#e6e6e6] mx-auto aspect-[16/9] w-full object-fill"
      />
    </a>
  )
}

export default PostLink
