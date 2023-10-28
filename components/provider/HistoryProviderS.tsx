import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { db } from '@/server/db'
import { getServerSession } from 'next-auth'
import React from 'react'
import HistoryProvider from './HistoryProvider'

const HistoryProviderS = async ({ children }: { children: React.ReactNode }) => {
  const startSession = new Date()
  const data = await getServerSession(authOptions)
  const endSession = new Date()
  console.log('[HistoryProviderS] get session', endSession.getTime() - startSession.getTime(), 'ms')
  const start = new Date()
  // ログイン時はdbから取得、非ログイン時は空配列を返す
  const result = data
    ? await db.viewHistory.findMany({
        where: {
          user_id: data.user.id
        }
      })
    : []
  const end = new Date()
  console.log('[HistoryProviderS] get history', end.getTime() - start.getTime(), 'ms')
  const history = result.map((item) => item.post_url)
  return <HistoryProvider>{children}</HistoryProvider>
}

export default HistoryProviderS
