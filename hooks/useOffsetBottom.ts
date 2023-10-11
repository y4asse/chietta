import { useEffect, useState } from 'react'
import { useThrottle } from './useThrottle'

export const useOffsetBottom = (ref?: React.RefObject<HTMLElement>) => {
  const [viewportBottom, setViewportBottom] = useState<number | undefined>(undefined)
  const [pageOffsetBottom, setPageOffsetBottom] = useState<number | undefined>(undefined)

  const handler = useThrottle(() => {
    if (!ref?.current) return
    const clientRect = ref.current.getBoundingClientRect()
    setViewportBottom(clientRect.bottom)
    const newPageOffsetBottom = clientRect.bottom + window.scrollY
    setPageOffsetBottom(newPageOffsetBottom)
  }, 100)

  useEffect(() => {
    if (!ref?.current) return
    handler()
    window.addEventListener('scroll', handler)
    return () => {
      window.removeEventListener('scroll', handler)
    }
  }, [handler])

  return { viewportBottom, pageOffsetBottom }
}
