'use client'

import React, { ReactNode } from 'react'
import Posts from '../tech/Posts'
import dynamic from 'next/dynamic'
import { PostItemType } from '@/types/postItem'
import ErrorComponent from '../error/ErrorComponent'
import { useScrollDetection } from '@/hooks/useScrollDetection'
import NoContent from '../error/NoContent'
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
  noContentText?: string
}

//ScrollDetectのリファクタリング後のコンポーネント
const ScrollDetection = ({ props, children, noContentText }: ScrollDetectionProps) => {
  const { ref, posts, isLoading, isEnd } = useScrollDetection({ props })
  if (!posts) return <ErrorComponent />
  return (
    <div ref={ref}>
      {children}
      {isEnd && noContentText && posts.length === 0 ? <NoContent text={noContentText} /> : <Posts posts={posts} />}
      {isLoading && !isEnd && <SkeltonContainer />}
    </div>
  )
}

export default ScrollDetection
