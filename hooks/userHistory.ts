'use client'
import { viewHistoryAtom } from '@/jotai/viewHistory'
import { useAtom } from 'jotai'

export default function useHistory() {
  const [history, setHistory] = useAtom(viewHistoryAtom)
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/viewHistory`).then((res) => {
    if (!res.ok) {
      console.log('Http Error')
      console.log('status: ' + res.status)
      console.log('statusText: ' + res.statusText)
      throw new Error(`HTTP error! Status: ${res.statusText}`)
    }
    res.json().then((posts) => {
      setHistory(posts)
    })
  })

  return {
    history,
    setHistory
  }
}
