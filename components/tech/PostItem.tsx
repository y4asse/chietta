'use client'

import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import dayjs from 'dayjs'
import Image from 'next/image'
import { displayCompanyName } from '@/utils/displayCompanyName'
import PostLink from './PostLink'
import { PostItem } from '@/types/postItem'
import { useAtom } from 'jotai'
import { viewHistoryAtom } from '@/jotai/viewHistory'

dayjs.extend(utc)
dayjs.extend(timezone)

const PostItem = ({ post }: { post: PostItem }) => {
  const { title, likedCount } = post
  const [viewHistory, setViewHistory] = useAtom(viewHistoryAtom)
  const isViewed = viewHistory.some((url) => url === post.url)
  const createdAt = post.createdAt.toString()
  const date = dayjs(createdAt).tz('Asia/Tokyo').format('YYYY/M/D/ HH:mm')
  const displayName = displayCompanyName(post.url)
  return (
    <article
      className={`rounded-xl border-2 border-[#e6e6e6] bg-[white]  mx-auto w-[340px]  overflow-hidden relative transition-all duration-300 ${
        isViewed && 'brightness-[0.9]'
      }`}
    >
      <PostLink post={post} isViewed={isViewed} />
      <div className="px-[16px] py-[10px] mb-10">
        <h1 className="font-bold">{title}</h1>
        {displayName && <p className="text-sm text-gray pt-3">{displayName}</p>}
        {likedCount && (
          <div className="absolute bottom-1 left-3 text-gray flex items-center justify-center gap-1">
            <Image src="/heart.svg" alt="ハートの画像" width={17} height={17} className=" opacity-70" />
            <span>{likedCount}</span>
          </div>
        )}
        <time className="absolute bottom-1 right-3 text-gray">{date}</time>
      </div>
    </article>
  )
}

export default PostItem
