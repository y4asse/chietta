'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import SubmitButton from './SubmitButton'
import { SubmitHandler, useForm } from 'react-hook-form'
import { updateProfile } from '@/app/settings/profile/action'
import Toast from '../utils/Toast'
import ImageInput from './ImageInput'
import useUserInfo from '@/hooks/useUserInfo'
import { FaXTwitter, FaGithub, FaPaperclip } from 'react-icons/fa6'
import Note from '../icons/Note'
import Image from 'next/image'
import Hatena from '../icons/Hatena'

type Inputs = {
  name: string
  introduction: string
  github: string
  x: string
  zenn: string
  qiita: string
  note: string
  hatena: string
  webSite: string
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
      introduction: data.introduction,
      github: data.github,
      x: data.x,
      zenn: data.zenn,
      qiita: data.qiita,
      note: data.note,
      hatena: data.hatena,
      webSite: data.webSite
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
      <form className="bg-white dark:bg-lightDark py-10" onSubmit={handleSubmit(onSubmit)}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between flex-wrap gap-3 ">
          <div className="w-full md:w-auto">
            <ImageInput />
          </div>
          <div className="w-full md:max-w-[700px]">
            {/* 名前 */}
            <div>
              <label className="font-bold" htmlFor="name">
                名前
              </label>
              <input
                type="text"
                required
                id="name"
                className="outline-primary mt-2 px-2 py-1 text-lg border border-[#afafaf] rounded w-full bg-main dark:bg-lightDark dark:text-white"
                defaultValue={user.name}
                placeholder="名前を入力..."
                {...register('name', { required: true, maxLength: 20, minLength: 1 })}
              />
              {watch('name') && watch('name').length > 20 && (
                <p className="text-primary">20文字以下で入力してください</p>
              )}
            </div>

            {/*   自己紹介 */}
            <div className="mt-5">
              <label className="font-bold" htmlFor="introduction">
                自己紹介
              </label>
              <textarea
                id="introduction"
                rows={5}
                className="outline-primary mt-2 px-2 py-1 text-lg border border-[#afafaf] rounded w-full bg-main dark:bg-lightDark dark:text-white"
                defaultValue={user.introduction ? user.introduction : ''}
                placeholder="自己紹介を入力..."
                {...register('introduction')}
              />
              {watch('introduction') && watch('introduction').length > 100 && (
                <p className="text-primary">100文字以下で入力してください</p>
              )}
            </div>

            {/* webSite */}
            <div className="mt-7">
              <label className="font-bold flex items-center gap-3" htmlFor="webSite">
                <FaPaperclip />
                あなたのWebサイト
              </label>
              <div>
                <input
                  type="url"
                  id="webSite"
                  className="outline-primary mt-2 px-2 py-1 text-lg border border-[#afafaf] rounded bg-main dark:bg-lightDark dark:text-white w-full"
                  defaultValue={user.webSite ? user.webSite : ''}
                  placeholder="https://example.com"
                  {...register('webSite')}
                />
              </div>
            </div>

            {/* X */}
            <div className="mt-7">
              <label className="font-bold flex items-center gap-3" htmlFor="x">
                <FaXTwitter className="text-xl" />
                Xのアカウント
              </label>
              <div className="flex gap-1 items-center">
                <span className="text-xl">@</span>
                <input
                  type="text"
                  id="x"
                  className="outline-primary mt-2 px-2 py-1 text-lg border border-[#afafaf] rounded bg-main dark:bg-lightDark dark:text-white"
                  defaultValue={user.x ? user.x : ''}
                  placeholder="ユーザ名を入力..."
                  {...register('x')}
                />
              </div>
            </div>

            {/* GitHub */}
            <div className="mt-7">
              <label className="font-bold flex items-center gap-3" htmlFor="github">
                <FaGithub className="text-xl" />
                GitHubのアカウント
              </label>
              <div>
                <span className="text-lg mr-1">https://github.com/</span>
                <input
                  type="text"
                  id="github"
                  className="outline-primary mt-2 px-2 py-1 text-lg border border-[#afafaf] rounded bg-main dark:bg-lightDark dark:text-white"
                  defaultValue={user.github ? user.github : ''}
                  placeholder="ユーザ名を入力..."
                  {...register('github')}
                />
              </div>
            </div>

            {/* Zenn */}
            <div className="mt-7">
              <label className="font-bold flex items-center gap-3" htmlFor="zenn">
                <img
                  className="w-[20px] h-[20px]"
                  src="https://static.zenn.studio/images/logo-transparent.png"
                  alt="Qiitaのアイコン"
                />
                Zennのアカウント
              </label>
              <div>
                <span className="text-lg mr-1">https://zenn.dev/</span>
                <input
                  type="text"
                  id="zenn"
                  className="outline-primary mt-2 px-2 py-1 text-lg border border-[#afafaf] rounded bg-main dark:bg-lightDark dark:text-white"
                  defaultValue={user.zenn ? user.zenn : ''}
                  placeholder="ユーザ名を入力..."
                  {...register('zenn')}
                />
              </div>
            </div>

            {/* Qiita */}
            <div className="mt-7">
              <label className="font-bold flex items-center gap-3" htmlFor="qiita">
                <img
                  className="w-[20px] h-[20px]"
                  src="https://cdn.qiita.com/assets/favicons/public/apple-touch-icon-ec5ba42a24ae923f16825592efdc356f.png"
                  alt="Zennのアイコン"
                />
                Qiitaのアカウント
              </label>
              <div>
                <span className="text-lg mr-1">https://qiita.com/</span>
                <input
                  type="text"
                  id="qiita"
                  className="outline-primary mt-2 px-2 py-1 text-lg border border-[#afafaf] rounded bg-main dark:bg-lightDark dark:text-white"
                  defaultValue={user.qiita ? user.qiita : ''}
                  placeholder="ユーザ名を入力..."
                  {...register('qiita')}
                />
              </div>
            </div>

            {/* note */}
            <div className="mt-7">
              <label className="font-bold flex items-center gap-3" htmlFor="note">
                <Note />
                noteのアカウント
              </label>
              <div>
                <span className="text-lg mr-1">https://note.com/</span>
                <input
                  type="text"
                  id="note"
                  className="outline-primary mt-2 px-2 py-1 text-lg border border-[#afafaf] rounded bg-main dark:bg-lightDark dark:text-white"
                  defaultValue={user.note ? user.note : ''}
                  placeholder="ユーザ名を入力..."
                  {...register('note')}
                />
              </div>
            </div>

            {/* hatena */}
            <div className="mt-7">
              <label className="font-bold flex items-center gap-3" htmlFor="hatena">
                <Hatena />
                はてなブログのアカウント
              </label>
              <div>
                <span className="text-lg mr-1">https://</span>
                <input
                  type="text"
                  id="hatena"
                  className="outline-primary mt-2 px-2 py-1 text-lg border border-[#afafaf] rounded bg-main dark:bg-lightDark dark:text-white"
                  defaultValue={user.hatena ? user.hatena : ''}
                  placeholder="ユーザ名を入力..."
                  {...register('hatena')}
                />
                .<span className="text-lg mr-1">hatenablog.com</span>
              </div>
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
