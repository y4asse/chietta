'use client'

import { PostCategory } from '@prisma/client'
import CategoryItem from './CategoryItem'
import { useAtom } from 'jotai'
import { followingAtom } from '@/jotai/followingAtom'
import { useEffect, useState } from 'react'

const Categories = ({ allCategories }: { allCategories: PostCategory[] }) => {
  const [following, setFollowing] = useAtom(followingAtom)
  const [filteredCategories, setfilteredCategories] = useState<PostCategory[]>(allCategories)
  const [input, setInput] = useState('')
  useEffect(() => {
    if (input === '') {
      setfilteredCategories(allCategories)
      return
    }
    const filtered = allCategories.filter((category) => category.name.toLowerCase().includes(input.toLowerCase()))
    setfilteredCategories(filtered)
  }, [input])
  return (
    <div className="py-10 mx-5">
      <div className="mb-10 ">
        <input
          className="border border-[#b6b6b6] px-5 py-3 text-lg rounded-full w-full cursor focus:outline-focus"
          placeholder="フォローするカテゴリーを検索..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {filteredCategories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}

export default Categories
