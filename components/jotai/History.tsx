'use client'

import { viewHistoryAtom } from '@/jotai/viewHistory'
import { ViewHistory } from '@prisma/client'
import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const History = ({ children }: { children: React.ReactNode }) => {
  const [, setHistory] = useAtom(viewHistoryAtom)
  const { data: session } = useSession()
  useEffect(() => {
    if (session) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/view?user_id=${session.user.id}`).then((res) => {
        if (res.ok) {
          res.json().then(({ result }: { result: ViewHistory[] }) => {
            const histories = result.map((item) => item.post_url)
            setHistory(histories)
          })
        }
      })
    }
  }, [session])
  return <>{children}</>
}

export default History
