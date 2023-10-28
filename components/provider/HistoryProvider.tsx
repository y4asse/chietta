'use client'

import { viewHistoryAtom } from '@/jotai/viewHistory'
import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [, setHistory] = useAtom(viewHistoryAtom)
  const { data: session, status } = useSession()

  const userId = session ? session.user.id : null
  useEffect(() => {
    if (status === 'loading') return
    if (!userId) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/view?user_id=${userId}`, {
      cache: 'no-cache'
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('エラーが発生しました')
        }
        const data = (await res.json()) as { post_url: string }[]
        setHistory(data.map((d) => d.post_url))
      })
      .catch((err) => {
        setHistory([])
      })
  }, [userId])
  return <>{children}</>
}

export default HistoryProvider
