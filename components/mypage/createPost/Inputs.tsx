'use client'

import { getOgp } from '@/server/getOgp'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useRef, useState } from 'react'
import { useForm, SubmitHandler, set } from 'react-hook-form'
import Modal from './Modal'

type Inputs = {
  url: string
  content: string
  isClosed: boolean
}

const Inputs = () => {
  const { data: session } = useSession()
  const user = session ? session.user : null
  const router = useRouter()
  const [image, setImage] = useState<string | null>(null)
  const [title, setTitle] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<Inputs>()
  const [isLoading, setIsLoading] = useState(false)
  if (!user) return

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isLoading) return
    setIsLoading(true)

    const newPost = {
      user_id: user.id,
      url: data.url,
      content: data.content,
      title: title ? title : '',
      isPublic: !data.isClosed
    }
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userPost`, {
      method: 'POST',
      body: JSON.stringify(newPost)
    })
      .then((res) => {
        if (!res.ok) throw new Error('エラーが発生しました')
        dialogRef.current?.showModal()
      })
      .catch((err) => {
        alert(err)
        setIsLoading(false)
        return
      })
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    if (url) {
      getOgp(url).then((ogp) => {
        if (!ogp) {
          setTitle(null)
          setImage(null)
          return
        }
        setTitle(ogp.ogTitle || null)
        setImage(ogp.ogImage ? ogp.ogImage[0].url : null)
      })
    } else {
      setTitle(null)
      setImage(null)
    }
  }
  const closeDialog = () => {
    router.push(`/${user.idCreatedByUser}/posts`)
    router.refresh()
  }

  return (
    <>
      <dialog onClick={closeDialog} ref={dialogRef} className="backdrop:bg-black backdrop:opacity-70 rounded-xl">
        <Modal closeDialog={closeDialog} content={watch('content')} url={watch('url')} />
      </dialog>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pt-5">
          <label>
            URL
            <input
              {...register('url', { required: true })}
              type="url"
              onChange={handleChange}
              placeholder="https://example.com"
              className="py-1 px-2 border-[#d0d0d0] border rounded-lg focus:outline-focus w-full"
            />
            {errors.url && (
              <span className="text-[#ff8f8f]" role="alert">
                このフィールドは必須です
              </span>
            )}
          </label>
        </div>
        {(image || title) && (
          <div className="mt-5 bg-white dark:bg-lightDark border border-[#cfcfcf] rounded-xl max-w-[400px] overflow-hidden text-gray font-bold mx-auto">
            {image && <img src={image} className=" aspect-[16/9]" alt="OGP画像" />}
            {title && <div className="p-3">{title}</div>}
          </div>
        )}
        <div className="mt-5">
          <label className="">
            <textarea
              rows={5}
              className={`py-1 px-2 border-[#d0d0d0] border rounded-lg focus:outline-focus w-full resize-none placeholder:font-normal`}
              placeholder="コメントを入力..."
              {...register('content')}
            />
          </label>
        </div>
        <div className="flex flex-col mt-5 gap-5">
          <div>
            <label className="inline-block pl-[0.15rem] hover:cursor-pointer text-xl font-bold">
              非公開
              <input
                type="checkbox"
                role="switch"
                className="ml-1 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[gray] before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-[#a7a7a7] after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-[#555555] dark:after:bg-[gray] dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#ff4b4b]"
                defaultChecked={false}
                {...register('isClosed')}
              />
            </label>
          </div>
          <div className="text-right">
            <input
              disabled={isLoading}
              type="submit"
              className={`rounded bg-primary text-white px-3 py-1 font-semibold ${
                isLoading ? 'cursor-not-allowed' : 'hover:cursor-pointer'
              }`}
              value={isLoading ? '投稿中...' : '投稿する'}
            />
          </div>
        </div>
      </form>
    </>
  )
}

export default Inputs
