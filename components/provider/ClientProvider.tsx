'use client'

import { followingAtom } from '@/jotai/followingAtom'
import { viewHistoryAtom } from '@/jotai/viewHistory'
import { getFollowingByUserId } from '@/server/category'
import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [, setHistory] = useAtom(viewHistoryAtom)
  const [, setFollowing] = useAtom(followingAtom)
  const { data: session, status } = useSession()

  const userId = session ? session.user.id : null
  useEffect(() => {
    if (status === 'loading') return
    if (!userId) return

    // 視聴履歴の取得
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

    // フォロー中のカテゴリの取得
    getFollowingByUserId(userId).then((data) => {
      if (data) {
        const following = data.map((item) => item.postCategory.id)
        setFollowing(following)
      }
    })
  }, [userId])
  return <>{children}</>
}

export default HistoryProvider
