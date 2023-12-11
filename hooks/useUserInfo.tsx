'use client'

import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function useUserInfo() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    if (status === 'authenticated') {
      fetch(`/api/user?user_id=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data.user)
        })
    }
  }, [status])

  return { user, setUser }
}
