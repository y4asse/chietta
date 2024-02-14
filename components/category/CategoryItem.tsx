'use client'

import { followingAtom } from '@/jotai/followingAtom'
import { deleteFollowCategory, followCategory } from '@/server/category'
import { PostCategory } from '@prisma/client'
import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'

const CategoryItem = ({ category }: { category: PostCategory }) => {
  const { data: session } = useSession()
  const userId = session ? session.user.id : null
  const [following, setFollowing] = useAtom(followingAtom)
  const isFollowing = following.includes(category.id)
  const handleClick = () => {
    if (userId === null) return
    if (isFollowing) {
      setFollowing((prev) => prev.filter((id) => id !== category.id))
      deleteFollowCategory(userId, category.id)
    } else {
      setFollowing((prev) => [...prev, category.id])
      followCategory(userId, category.id)
    }
  }
  return (
    <button
      onClick={handleClick}
      className={`border rounded p-3 text-lg font-bold w-[130px] h-[80px] text-center duration-200 transition-all border-[#dadada] ${
        isFollowing && 'bg-primary text-white border-none text-white'
      }`}
    >
      {category.name}
    </button>
  )
}

export default CategoryItem
