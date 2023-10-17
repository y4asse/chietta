'use client'

import { useOffsetBottom } from '@/hooks/useOffsetBottom'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import Posts from '../tech/Posts'
import { ReturnPost } from '@/app/api/post/route'
import dynamic from 'next/dynamic'
import { getLatestPosts, getSearchPosts } from '@/server/getPosts'
const SkeltonContainer = dynamic(() => import('../skelton/SkeltonContainer'))

// 下から200pxのところで新しいやつを入れる
const ScrollDetect = ({ children, type, q }: { children: ReactNode; type: 'latest' | 'search'; q: string }) => {
  // scroll ref
  const ref = useRef(null)
  const { pageOffsetBottom, viewportBottom } = useOffsetBottom(ref)
  const getPosts = type === 'latest' ? getLatestPosts : getSearchPosts
  // posts
  const [posts, setPosts] = useState<ReturnPost[] | null>([])
  const initialOffset = 10
  const offset = posts ? posts.length + initialOffset : initialOffset
  const [isLoading, setIsLoading] = useState(false)
  const [isEnd, setIsEnd] = useState(false)
  const isScrolledBottom = viewportBottom ? viewportBottom < 1500 : false

  useEffect(() => {
    if (isLoading) return
    if (!isScrolledBottom) return
    if (!posts) return

    setIsLoading(true)
    getPosts(offset, q).then((newPosts) => {
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
  }, [isScrolledBottom, isLoading])
  if (!posts) return <div>error</div>

  return (
    <div ref={ref}>
      {children}
      <Posts posts={posts} />
      {isLoading && !isEnd && <SkeltonContainer />}
    </div>
  )
}

export default ScrollDetect
