'use client'

import { viewHistoryAtom } from '@/jotai/viewHistory'
import { Entry } from '@prisma/client'
import { useAtom } from 'jotai'
import { Session } from 'next-auth'
import { MdOpenInNew } from 'react-icons/md'

const EntryLink = ({ entry, session }: { entry: Entry; session: Session | null }) => {
  const [, setViewHistory] = useAtom(viewHistoryAtom)
  const handleClick = () => {
    setViewHistory((prev) => [...prev, entry.url])
    if (session) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/view?post_url=${entry.url}`, {
        method: 'POST'
      })
    }
  }
  return (
    <a href={entry.url} className="hover:underline" target="_blank" onClick={handleClick}>
      {entry.title ? entry.title : entry.url}
      <MdOpenInNew className="inline ml-1" />
    </a>
  )
}

export default EntryLink
