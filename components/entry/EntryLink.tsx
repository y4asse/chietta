'use client'

import { viewHistoryAtom } from '@/jotai/viewHistory'
import { useAtom } from 'jotai'
import { Session } from 'next-auth'
import { MdOpenInNew } from 'react-icons/md'

const EntryLink = ({
  image,
  url,
  title,
  session
}: {
  image: string | null
  url: string
  title: string | null
  session: Session | null
}) => {
  const [, setViewHistory] = useAtom(viewHistoryAtom)
  const handleClick = () => {
    setViewHistory((prev) => [...prev, url])
    if (session) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/view?post_url=${url}`, {
        method: 'POST'
      })
    }
  }
  return (
    <a href={url} className="hover:underline" target="_blank" onClick={handleClick}>
      {title ? title : url}
      <MdOpenInNew className="inline ml-1" />
    </a>
  )
}

export default EntryLink
