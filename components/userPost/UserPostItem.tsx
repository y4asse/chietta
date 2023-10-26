import { WithImageUrl } from '@/server/addOgp'
import { UserPost } from '@prisma/client'
import React from 'react'
import PostLink from '../tech/PostLink'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { WithUser } from './UserPosts'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import MoreButton from './MoreButton'

export type UserPostsWithImage = UserPost & { image: string }

dayjs.extend(utc)
dayjs.extend(timezone)

const UserPostItem = async ({ userPost }: { userPost: WithImageUrl<WithUser<UserPost>> }) => {
  const session = await getServerSession(authOptions)
  const user = session ? session.user : null
  const isMine = userPost.user_id === user?.id
  if (!userPost.isPublic && !isMine) {
    return
  }
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
          <h1 className="flex justify-between">
            <Link href={`/user/${userPost.user_id}`} className="mb-2 font-semibold">
              {userPost.user.name}
            </Link>
            <MoreButton />
          </h1>
          <span className=" font-normal">{userPost.content}</span>
          <div className="max-w-[512px] rounded-xl overflow-hidden mt-3">
            <PostLink url={userPost.url} image_url={userPost.image_url} />
          </div>
          <div className="text-gray mt-2 justify-end flex items-center gap-2">
            {!userPost.isPublic && <span className="bg-gray text-[white] px-1 rounded-lg">非公開</span>}
            <time dateTime={userPost.createdAt.toString()}>{date}</time>
          </div>
        </div>
      </div>
    </article>
  )
}

export default UserPostItem
