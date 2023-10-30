'use client'

import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { motion } from 'framer-motion'

type Inputs = {
  name: string
  introduction: string | null
  image: string
}

const Profile = ({ user }: { user: User }) => {
  const { data: session } = useSession()
  const sessionUser = session ? session.user : null
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<Inputs>()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true)
    const newUser = {
      id: user.id,
      name: data.name,
      introduction: data.introduction
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: 'PUT',
      body: JSON.stringify(newUser)
    }).catch((err) => {
      alert(err)
      return
    })
    router.refresh()
    setIsEditing(false)
    setIsLoading(false)
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap max-x-[1000px] mx-auto gap-10 pb-10">
        <div className="mx-auto">
          <img src={user.image!} alt="ユーザアイコン" className="w-[100px] h-[100px] rounded-full " />
        </div>
        <div className="mx-auto font-semibold max-w-[500px]">
          <div className="">
            <label className="w-full">
              表示名:
              <input
                id="name"
                defaultValue={user.name!}
                className="py-1 px-2 border-[#d0d0d0] border rounded-lg focus:outline-focus w-[170px]"
                placeholder="名前を入力..."
                {...register('name', { required: true })}
              />
              {errors.name && (
                <span role="alert" className="text-[#ff8f8f]">
                  このフィールドは必須です
                </span>
              )}
            </label>
          </div>
          <div className="mt-5">
            <label className="">
              自己紹介:
              <textarea
                defaultValue={user.introduction ? user.introduction : ''}
                rows={3}
                className={`font-bold py-1 px-2 border-[#d0d0d0] border rounded-lg focus:outline-focus w-full resize-none `}
                placeholder="自己紹介を入力..."
                {...register('introduction')}
              />
            </label>
          </div>
          <div className="mt-5">
            <input
              type="submit"
              className="rounded bg-primary text-[white] px-3 py-1 font-semibold hover:cursor-pointer"
              value={isLoading ? '保存中...' : '保存'}
            />
            <button onClick={() => setIsEditing(false)} className="bg-gray px-3 py-1 rounded text-[white] ml-3">
              キャンセル
            </button>
          </div>
        </div>
      </form>
    )
  }
  return (
    <div className="items-center flex flex-wrap max-x-[800px] mx-auto gap-10 pb-10">
      <img src={user.image!} alt="ユーザアイコン" className="w-[150px] h-[150px] rounded-full mx-auto" />
      <div className="mx-auto relative pb-[50px]">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="mt-5 text-gray">{user.introduction ?? '自己紹介がありません'}</p>
        {sessionUser && user.id === sessionUser.id && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 absolute bottom-1">
            <button
              onClick={() => setIsEditing(true)}
              className="rounded bg-primary text-[white] px-3 py-1 font-semibold"
            >
              プロフィールを編集
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Profile
