'use client'

import { useOffsetBottom } from '@/hooks/useOffsetBottom'
import { Post } from '@prisma/client'
import React, { ReactNode, Suspense, useEffect, useRef, useState } from 'react'
import Posts from '../tech/Posts'
import { getPosts } from '@/server/getPosts'

// 下から200pxのところで新しいやつを入れる
const ScrollDetect = ({ children }: { children: ReactNode }) => {
  // scroll ref
  const ref = useRef(null)
  const { pageOffsetBottom, viewportBottom } = useOffsetBottom(ref)

  // posts
  const [posts, setPosts] = useState<Post[] | null>([])
  const [isLoading, setIsLoading] = useState(false)
  const isScrolledBottom = viewportBottom ? viewportBottom < 1500 : false
  useEffect(() => {
    if (isLoading) return
    if (!isScrolledBottom) return
    setIsLoading(true)
    getPosts().then((posts) => {
      if (!posts) return
      setPosts((prev) => {
        if (!prev) return prev
        return [...prev, ...posts]
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
    </div>
  )
}

export default ScrollDetect
