'use client'

import { viewHistoryAtom } from '@/jotai/viewHistory'
import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import React from 'react'

const PostLink = ({ url, image, isViewed }: { url: string; image: string | null; isViewed?: boolean }) => {
  const { data: session } = useSession()
  const [, setViewHistory] = useAtom(viewHistoryAtom)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isViewed) return
    setViewHistory((prev) => [...prev, url])
    if (!session) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/view?post_url=${url}`, {
      method: 'POST'
    })
  }
  return (
    <a href={url} onClick={handleClick} className="w-[95%] hover:opacity-90" target="_blank">
      <img
        src={
          image
            ? image
            : 'https://firebasestorage.googleapis.com/v0/b/cheeta-38f77.appspot.com/o/no-image.png?alt=media&token=d7bcb383-25c7-4ab9-8d67-aadf4d14b9ad'
        }
        alt="image"
        className="border-[#e6e6e6] mx-auto w-full max-h-[178.5px] object-contain"
      />
    </a>
  )
}

export default PostLink
