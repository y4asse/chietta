import { Like } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const useLikes = () => {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const [likes, setLikes] = useState<Like[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return
    setIsLoading(true)
    const fetchLikes = async () => {
      try {
        const res = await fetch(`/api/like/${userId}`)
        if (!res.ok) throw new Error('エラーが発生しました')
        const data = await res.json()
        if (!data.likes) throw new Error('無効なレスポンス')
        setLikes(data.likes)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchLikes()
  }, [userId])

  return { likes, isLoading, error }
}
