import { Like } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const useLikes = () => {
  const { data: session } = useSession()
  const user = session ? session.user : null
  const [likes, setLikes] = useState<Like[]>([])
  useEffect(() => {
    if (!user) return
    const fetchLikes = async () => {
      const res = await fetch(`/api/like/${user.id}`)
      if (!res.ok) return
      const data = await res.json()
      setLikes(data.likes)
    }
    fetchLikes()
  }, [user])
  return likes
}
