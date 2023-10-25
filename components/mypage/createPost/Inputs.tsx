'use client'

import { getOgp } from '@/server/getOgp'
import { User } from 'next-auth'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'
import { useForm, SubmitHandler, set } from 'react-hook-form'

type Inputs = {
  url: string
  content: string
}

const Inputs = ({ user }: { user: User }) => {
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

    const newPost = {
      user_id: user.id,
      url: data.url,
      content: data.content,
      title: title ? title : ''
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userPost`, {
      method: 'POST',
      body: JSON.stringify(newPost)
    })
      .then((res) => {
        return res.json()
      })
      .catch((err) => {
        alert(err)
        setIsLoading(false)
        return
      })
    router.push('/posts')
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
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
          <div className="mt-5 bg-[white] border border-[#cfcfcf] rounded-xl max-w-[400px] overflow-hidden text-lg text-gray font-bold mx-auto">
            {image && <img src={image} className=" aspect-[16/9]" alt="OGP画像" />}
            {title && <div className="p-1">{title}</div>}
          </div>
        )}
        <div className="mt-5">
          <label className="">
            <textarea
              rows={5}
              className={`font-bold py-1 px-2 border-[#d0d0d0] border rounded-lg focus:outline-focus w-full resize-none placeholder:font-normal`}
              placeholder="この記事めっちゃ参考になった"
              {...register('content', { required: true })}
            />
            {errors.content && (
              <span className="text-[#ff8f8f]" role="alert">
                このフィールドは必須です
              </span>
            )}
          </label>
        </div>
        <div className="text-right">
          <input
            type="submit"
            className="rounded bg-primary text-[white] px-3 py-1 mt-5 font-semibold hover:cursor-pointer"
            value={isLoading ? '投稿中...' : '投稿する'}
          />
        </div>
      </div>
    </form>
  )
}

export default Inputs
