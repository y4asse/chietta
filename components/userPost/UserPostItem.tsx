import { WithImageUrl } from '@/server/addOgp'
import { UserPost } from '@prisma/client'
import React from 'react'
import PostLink from '../tech/PostLink'
import PostItem from '../tech/PostItem'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { WithUser } from './UserPosts'
import Link from 'next/link'

export type UserPostsWithImage = UserPost & { image: string }

dayjs.extend(utc)
dayjs.extend(timezone)

const UserPostItem = ({ userPost }: { userPost: WithImageUrl<WithUser<UserPost>> }) => {
  const date = dayjs(userPost.createdAt).tz('Asia/Tokyo').format('YYYY/M/D/ HH:mm')
  return (
    <article
      className={`px-3 py-5 shadow bg-[white]  mx-auto w-full overflow-hidden relative transition-all duration-300`}
    >
      <div className="flex justify-center gap-3">
        <Link href={`/user/${userPost.user_id}`} className="min-w-[40px]">
          <img
            className="w-[40px] h-[40px] rounded-full border-[#e2e2e2] border"
            src={userPost.user.image!}
            alt="ユーザアイコン"
          />
        </Link>
        <div className="max-w-[512px] w-[95%]">
          <h1>
            <Link href={`/user/${userPost.user_id}`} className="mb-2 font-semibold">
              {userPost.user.name}
            </Link>
          </h1>
          <span className=" font-semibold">{userPost.content}</span>
          <div className="max-w-[512px] rounded-xl overflow-hidden mt-3">
            <PostLink url={userPost.url} image_url={userPost.image_url} />
          </div>
          <div className="text-gray mt-2 text-right">
            <time dateTime={userPost.createdAt.toString()}>{date}</time>
          </div>
        </div>
      </div>
    </article>
  )
}

export default UserPostItem
