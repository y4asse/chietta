'use client'

import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ProfileInput = () => {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    if (status === 'authenticated') {
      fetch(`/api/user?user_id=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data.user)
        })
    }
  }, [status])
  if (user === null) return
  return (
    <div className="bg-[white] p-10 ">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between flex-wrap gap-3 ">
        <div className="w-full md:w-auto">
          <img src={user.image ? user.image : ''} className="w-[120px] h-[120px] rounded-full" />
        </div>
        <div className="w-full md:max-w-[700px]">
          <div>
            <label className="font-bold" htmlFor="name">
              名前
            </label>
            <input
              type="text"
              id="name"
              className="outline-primary mt-2 px-2 py-1 text-lg border border-[#afafaf] rounded w-full bg-main"
              defaultValue={user.name}
            />
          </div>
          <div className="mt-5">
            <label className="font-bold" htmlFor="introduction">
              自己紹介
            </label>
            <textarea
              id="introduction"
              rows={5}
              className="outline-primary mt-2 px-2 py-1 text-lg border border-[#afafaf] rounded w-full bg-main"
              defaultValue={user.introduction ? user.introduction : ''}
              placeholder="自己紹介を入力..."
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProfileInput
