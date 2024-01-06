'use client'

import React, { ReactNode } from 'react'
import Posts from '../tech/Posts'
import dynamic from 'next/dynamic'
import { PostItemType } from '@/types/postItem'
import ErrorComponent from '../error/ErrorComponent'
import { useScrollDetection } from '@/hooks/useScrollDetection'
const SkeltonContainer = dynamic(() => import('../skelton/SkeltonContainer'))

type Args = {
  idCreatedByUser: string
}

type Props = {
  args: Args
  getter: (props: Args & { take: number; skip: number }) => Promise<PostItemType[] | null>
  initialOffset?: number
}

export type ScrollDetectionProps = {
  children?: ReactNode
  props: Props
}

//ScrollDetectのリファクタリング後のコンポーネント
const ScrollDetection = ({ props, children }: ScrollDetectionProps) => {
  const { ref, posts, isLoading, isEnd } = useScrollDetection({ props })
  if (!posts) return <ErrorComponent />
  return (
    <div ref={ref}>
      {children}
      <Posts posts={posts} />
      {isLoading && !isEnd && <SkeltonContainer />}
    </div>
  )
}

export default ScrollDetection
