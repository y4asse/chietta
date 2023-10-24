'use client'

import { viewHistoryAtom } from '@/jotai/viewHistory'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'

const HistoryProvider = ({ children, history }: { children: React.ReactNode; history: string[] }) => {
  const [, setHistory] = useAtom(viewHistoryAtom)
  useEffect(() => {
    setHistory(history)
  }, [])
  return <>{children}</>
}

export default HistoryProvider
