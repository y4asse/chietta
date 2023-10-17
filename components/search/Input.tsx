'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Input = ({ q }: { q: string }) => {
  const router = useRouter()
  const [searchWord, setSearchWord] = useState(q)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/search?q=${searchWord}`)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.prefetch(`/search?q=${e.target.value}`)
    setSearchWord(e.target.value)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="q"
        required
        className="border border-[#b6b6b6] px-5 py-3 text-lg rounded-full w-full cursor focus:outline-[#fdcaca]"
        placeholder="検索ワードを入力..."
        value={searchWord}
        onChange={handleChange}
      />
    </form>
  )
}

export default Input
