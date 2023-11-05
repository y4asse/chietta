'use client'

import { WithImageUrl } from '@/server/addOgp'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit, MdMoreHoriz } from 'react-icons/md'
import { WithUser } from './UserPosts'
import { UserPost } from '@prisma/client'

const MoreButton = ({ userPost }: { userPost: WithImageUrl<WithUser<UserPost>> }) => {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const deleteHandler = () => {
    const result = confirm('本当に削除しますか？')
    if (result) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/userPost`, {
        method: 'DELETE',
        cache: 'no-cache',
        body: JSON.stringify({ post_id: userPost.id, user_id: userPost.user_id })
      }).then((res) => {
        if (!res.ok) {
          alert('削除に失敗しました')
          return
        }
        router.refresh()
      })
    }
  }
  const editHandler = () => {
    router.push(`/mypage/updatePost/${userPost.id}`)
  }
  const moreList = [
    { name: '編集', icon: <MdEdit />, handler: editHandler },
    { name: '削除', icon: <MdDelete />, handler: deleteHandler }
  ]
  const clickHandler = () => {
    setShowModal((prev) => !prev)
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLElement)) {
        return
      }
      setShowModal((prev) => {
        if (prev) return false
        return prev
      })
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])
  return (
    <div className="relative">
      <button className="text-2xl" onClick={clickHandler}>
        <span id={`moreModal_${userPost.id}`}>
          <MdMoreHoriz />
        </span>
      </button>
      {showModal && (
        <div className="absolute border rounded-xl text-xl border-[#c2c2c2] py-3 px-5 bg-[white] top-full right-0 flex flex-col gap-3">
          {moreList.map((item, index) => (
            <button key={index} className="flex items-center gap-3 text-gray" onClick={item.handler}>
              {item.icon}
              <p className="whitespace-nowrap">{item.name}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default MoreButton
