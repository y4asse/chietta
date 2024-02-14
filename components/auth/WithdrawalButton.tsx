'use client'

import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const WithdrawalButton = () => {
  const { data: session } = useSession()
  const handleClick = async () => {
    if (confirm('退会すると全てのデータは削除され、復元できません。本当に退会しますか？')) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: 'DELETE',
        body: JSON.stringify({ id: session!.user.id })
      })
      if (!res.ok) {
        alert('エラーが発生しました')
        return
      }
      alert('退会手続きが完了しました。またのご利用をお待ちしております')
      await signOut({ callbackUrl: '/' })
    }
  }
  return (
    <button
      className="shadow px-3 py-2 rounded-lg flex items-center text-xl mx-auto mt-10 gap-3 bg-primary text-white"
      onClick={handleClick}
    >
      <span className="text-lg">退会する</span>
    </button>
  )
}

export default WithdrawalButton
