'use client'
import { loadingAtom } from '@/jotai/loadingAtom'
import { useAtom } from 'jotai'

export default function useLoading() {
  const [value, setValue] = useAtom(loadingAtom)

  // ローディング開始
  const start = () => {
    setValue(true)
  }

  // ローディング終了
  const stop = () => {
    setValue(false)
  }

  return {
    value,
    start,
    stop
  }
}
