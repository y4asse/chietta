'use client'

import { useEffect, useRef, useState } from 'react'
import { MdKeyboardArrowDown, MdLogout } from 'react-icons/md'
import MoreMenu from './MoreMenu'
import { MdDelete } from 'react-icons/md'
import { deleteComment } from '@/app/entry/[url]/_actions/actions'
import { useRouter } from 'next/navigation'

const MoreMenuButton = ({ commentId }: { commentId: string }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const handleDelete = async () => {
    if (!confirm('コメントを削除しますか？')) return
    const { error } = await deleteComment({ commentId })
    if (error) return alert(error)
    setIsOpen(false)
    router.refresh()
  }

  const list = [
    {
      name: '削除',
      handleClick: handleDelete,
      icon: <MdDelete />
    }
  ]

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    // 外部クリックのリスナーを追加
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // コンポーネントのアンマウント時にリスナーを削除
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-2xl text-gray hover:bg-lightGray rounded-full transition-all duration-200"
      >
        <MdKeyboardArrowDown />
      </button>
      {isOpen && (
        <div className="absolute top-0 left-0">
          <MoreMenu list={list} />
        </div>
      )}
    </div>
  )
}

export default MoreMenuButton
