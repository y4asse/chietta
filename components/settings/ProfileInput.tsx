'use client'

import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SubmitButton from './SubmitButton'
import { SubmitHandler, useForm } from 'react-hook-form'
import { updateProfile } from '@/app/settings/profile/action'
import Toast from '../utils/Toast'
import ImageInput from './ImageInput'
import useUserInfo from '@/hooks/useUserInfo'

type Inputs = {
  name: string
  introduction: string
}
const ProfileInput = () => {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { user, setUser } = useUserInfo()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true)
    const newUser = {
      userId: session!.user.id,
      name: data.name,
      introduction: data.introduction
    }
    const res = await updateProfile(newUser)
    if (res.message === 'error') {
      setIsLoading(false)
      return alert('エラーが発生しました')
    }
    setIsOpen(true)
    setIsLoading(false)
  }

  if (user === null) return

  return (
    <>
      <Toast content="保存しました" setIsOpen={setIsOpen} isOpen={isOpen} />
      <form className="bg-[white] p-10" onSubmit={handleSubmit(onSubmit)}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between flex-wrap gap-3 ">
          <div className="w-full md:w-auto">
            <ImageInput />
          </div>
          <div className="w-full md:max-w-[700px]">
            <div>
              <label className="font-bold" htmlFor="name">
                名前
              </label>
              <input
                type="text"
                required
                id="name"
                className="outline-primary mt-2 px-2 py-1 text-lg border border-[#afafaf] rounded w-full bg-main"
                defaultValue={user.name}
                placeholder="名前を入力..."
                {...register('name', { required: true, maxLength: 20, minLength: 1 })}
              />
              {watch('name') && watch('name').length > 20 && (
                <p className="text-primary">20文字以下で入力してください</p>
              )}
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
                {...register('introduction')}
              />
              {watch('introduction') && watch('introduction').length > 100 && (
                <p className="text-primary">100文字以下で入力してください</p>
              )}
            </div>
            <div className="mt-5 text-right">
              <SubmitButton pending={isLoading} />
            </div>
          </div>
        </motion.div>
      </form>
    </>
  )
}

export default ProfileInput
