'use client'

import { useOffsetBottom } from '@/hooks/useOffsetBottom'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import Posts from '../tech/Posts'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
import { PostItemType } from '@/types/postItem'
import { Type, getPost } from '@/server/getPosts'
import WrapContainer from '../layout/WrapContainer'
const SkeltonContainer = dynamic(() => import('../skelton/SkeltonContainer'))

// 下から200pxのところで新しいやつを入れる
const ScrollDetect = ({
  children,
  type,
  q,
  initialOffset = 10,
  feedId
}: {
  children?: ReactNode
  type: Type
  q?: string
  initialOffset?: number
  feedId?: string
}) => {
  const ref = useRef(null)
  const { viewportBottom } = useOffsetBottom(ref)
  const { data: session, status } = useSession()
  const [posts, setPosts] = useState<PostItemType[] | null>([])
  const offset = posts ? posts.length + initialOffset : initialOffset
  const [isLoading, setIsLoading] = useState(false)
  const [isEnd, setIsEnd] = useState(false)
  const userId = session ? session.user.id : null
  useEffect(() => {
    const windowBottom = window.scrollY + window.innerHeight
    const isScrolledBottom = viewportBottom ? viewportBottom < windowBottom : false
    if (status === 'loading') return
    if (isLoading) return
    if (!isScrolledBottom) return
    if (!posts) return

    setIsLoading(true)
    getPost(type, { offset, userId, q, feedId }).then((newPosts) => {
      //エラーが起きた時isLoadingはtrueのままになる
      if (!newPosts) return
      if (newPosts.length === 0) {
        setIsEnd(true)
        return
      }

      // isLoadingは2秒後にfalseになる
      setPosts(() => {
        return [...posts, ...newPosts]
      })
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    })
  }, [viewportBottom, isLoading, userId, status])
  if (!posts) return <WrapContainer>error</WrapContainer>
  return (
    <div ref={ref}>
      {children}
      <Posts posts={posts} />
      {isLoading && !isEnd && <SkeltonContainer />}
    </div>
  )
}

export default ScrollDetect
