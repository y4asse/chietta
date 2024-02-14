'use client'

import useLoading from '@/hooks/useLoading'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Spinner from './Spinner'

const Input = ({ q }: { q: string }) => {
  const router = useRouter()

  const { value: isLoading, start: startIsLoading, stop: stopIsLoading } = useLoading()
  const [searchWord, setSearchWord] = useState(q)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (q === searchWord) return
    startIsLoading()
    inputRef.current?.blur()
    router.push(`/search?q=${searchWord}`)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value)
  }

  useEffect(() => {
    stopIsLoading()
  }, [q])
  return (
    <form onSubmit={handleSubmit} className="px-3">
      <input
        ref={inputRef}
        type="text"
        name="q"
        required
        className="border border-[#b6b6b6] px-5 py-3 text-lg rounded-full w-full cursor focus:outline-focus dark:bg-lightDark"
        placeholder="検索ワードを入力..."
        value={searchWord}
        onChange={handleChange}
      />
      {isLoading && <Spinner />}
    </form>
  )
}

export default Input
