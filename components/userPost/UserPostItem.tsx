'use client'

import React from 'react'
import PostLink from '../tech/PostLink'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import Link from 'next/link'
import MoreButton from './MoreButton'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import LikeButton from './LikeButton'
import { PostWithData } from '@/app/api/userPost/route'
import { Like } from '@prisma/client'

dayjs.extend(utc)
dayjs.extend(timezone)

const UserPostItem = ({ userPost, defaultLiked }: { userPost: PostWithData; defaultLiked: boolean }) => {
  const { data: session } = useSession()
  const user = session ? session.user : null
  const isMine = userPost.user_id === user?.id
  if (!userPost.isPublic && !isMine) {
    return
  }
  const date = dayjs(userPost.createdAt).tz('Asia/Tokyo').format('YYYY/M/D/ HH:mm')
  return (
    <article className={`py-7 bg-[white]  mx-auto w-full overflow-hidden relative transition-all duration-300`}>
      <div className="flex justify-center gap-3">
        <div>
          <Link href={`/user/${userPost.user_id}`} className="min-w-[40px]">
            <img
              className="w-[40px] h-[40px] rounded-full border-[#e2e2e2] border"
              src={userPost.user.image!}
              alt="ユーザアイコン"
            />
          </Link>
        </div>
        <div className="max-w-[512px] w-[95%]">
          <div className="relative">
            <Link href={`/user/${userPost.user_id}`} className="mb-2 font-semibold">
              {userPost.user.name}
            </Link>
            {isMine && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-1 right-1">
                <MoreButton userPost={userPost} />
              </motion.div>
            )}
          </div>
          <span className=" font-normal">{userPost.content}</span>
          <div className="max-w-[512px] rounded-xl overflow-hidden mt-3">
            <PostLink url={userPost.url} image_url={userPost.image_url} />
          </div>
          <div></div>
          <div className="text-gray mt-2 justify-between flex items-center gap-2">
            <LikeButton userPostId={userPost.id} defaultLiked={defaultLiked} defaultCount={userPost._count.like} />
            <div>
              {!userPost.isPublic && <span className="bg-gray text-[white] px-1 rounded-lg">非公開</span>}
              <time dateTime={userPost.createdAt.toString()}>{date}</time>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default UserPostItem
