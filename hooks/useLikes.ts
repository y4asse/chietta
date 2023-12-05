'use client'

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
      try {
        const res = await fetch(`/api/like/${user.id}`)
        if (!res.ok) throw new Error('エラーが発生しました')
        const data = await res.json()
        setLikes(data.likes)
      } catch (err) {
        return
      }
    }
    fetchLikes()
  }, [user])
  return likes
}
