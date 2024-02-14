'use client'

import { getOgp } from '@/server/getOgp'
import { UserPost } from '@prisma/client'
import { User } from 'next-auth'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm, SubmitHandler, set } from 'react-hook-form'

type Inputs = {
  url: string
  content: string
  isClosed: boolean
}

const Inputs = ({ sessionUser, post }: { sessionUser: User; post: UserPost }) => {
  const router = useRouter()
  const [image, setImage] = useState<string | null>(null)
  const [title, setTitle] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<Inputs>()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isLoading) return
    setIsLoading(true)

    if (sessionUser.id !== post.user_id) {
      alert('権限がありません')
      setIsLoading(false)
      return
    }

    const newPost = {
      id: post.id,
      url: data.url,
      title: title ? title : '',
      content: data.content,
      user_id: sessionUser.id,
      isPublic: !data.isClosed
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userPost`, {
      method: 'PUT',
      body: JSON.stringify(newPost)
    })
      .then((res) => {
        if (!res.ok) throw new Error('エラーが発生しました')
        router.push(`/${sessionUser.idCreatedByUser}/timeline`)
        router.refresh()
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

  useEffect(() => {
    const url = post.url
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
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pt-5">
        <label>
          URL
          <input
            defaultValue={post.url}
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
        <div className="mt-5 bg-white dark:bg-lightDark border border-[#cfcfcf] rounded-xl max-w-[400px] overflow-hidden text-lg text-gray font-bold mx-auto">
          {image && <img src={image} className=" aspect-[16/9]" alt="OGP画像" />}
          {title && <div className="p-1">{title}</div>}
        </div>
      )}
      <div className="mt-5">
        <label className="">
          <textarea
            defaultValue={post.content ? post.content : ''}
            rows={5}
            className={`py-1 px-2 border-[#d0d0d0] border rounded-lg focus:outline-focus w-full resize-none placeholder:font-normal`}
            placeholder="コメントを入力..."
            {...register('content')}
          />
        </label>
      </div>
      <div className="flex justify-between mt-5">
        <div>
          <label className="inline-block pl-[0.15rem] hover:cursor-pointer text-xl font-bold">
            非公開
            <input
              type="checkbox"
              role="switch"
              className="ml-1 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[gray] before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-[#a7a7a7] after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-[#555555] dark:after:bg-[gray] dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#ff4b4b]"
              defaultChecked={!post.isPublic}
              {...register('isClosed')}
            />
          </label>
        </div>
        <input
          type="submit"
          className="rounded bg-primary text-white px-3 py-1 font-semibold hover:cursor-pointer"
          value={isLoading ? '編集中...' : '編集する'}
        />
      </div>
    </form>
  )
}

export default Inputs
