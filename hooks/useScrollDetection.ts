import { PostItemType } from '@/types/postItem'
import { useSession } from 'next-auth/react'
import { useRef, useState, useEffect } from 'react'
import { useOffsetBottom } from './useOffsetBottom'
import { ScrollDetectionProps } from '@/components/scroll/ScrollDetection'

// 下から200pxのところで新しいやつを入れる
export const useScrollDetection = ({ props }: ScrollDetectionProps) => {
  const { getter, args, initialOffset = 0 } = props
  const ref = useRef(null)
  const { viewportBottom } = useOffsetBottom(ref)
  const { data: session, status } = useSession()
  const [posts, setPosts] = useState<PostItemType[] | null>([])
  const offset = posts ? posts.length + initialOffset : initialOffset
  const [isLoading, setIsLoading] = useState(false)
  const [isEnd, setIsEnd] = useState(false)
  const isScrolledBottom = viewportBottom ? viewportBottom < 1500 : false
  useEffect(() => {
    if (status === 'loading') return
    if (isLoading) return
    if (!isScrolledBottom) return
    if (!posts) return

    setIsLoading(true)
    getter({ ...args, skip: offset, take: 10 }).then((newPosts) => {
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
  }, [isScrolledBottom, isLoading, session, status])
  return { ref, posts, isLoading, isEnd }
}
