'use client'

import Image from 'next/image'
import PostLink from './PostLink'
import { PostItemType } from '@/types/postItem'
import { useAtom } from 'jotai'
import { viewHistoryAtom } from '@/jotai/viewHistory'
import { calcDiffTime } from '@/utils/calcDiffTime'

const PostItem = ({ post, hiddenDate }: { post: PostItemType; hiddenDate?: boolean }) => {
  const { title, likedCount } = post
  const [viewHistory, setViewHistory] = useAtom(viewHistoryAtom)
  const isViewed = viewHistory.some((url) => url === post.url)
  const { company } = post
  const diffTime = calcDiffTime(post.createdAt)
  return (
    <article
      className={`rounded-xl border-2 border-[#e6e6e6] bg-[white]  mx-auto w-[340px]  overflow-hidden relative transition-all duration-300 ${
        isViewed && 'brightness-[0.9]'
      }`}
    >
      <PostLink url={post.url} image_url={post.image_url} isViewed={isViewed} />
      <div className="px-[16px] py-[10px] mb-10">
        <h1 className="font-bold">{title}</h1>
        {company && <p className="text-sm text-gray pt-3">{company.name}</p>}
        {likedCount && (
          <div className="absolute bottom-1 left-3 text-gray flex items-center justify-center gap-1">
            <Image src="/heart.svg" alt="ハートの画像" width={17} height={17} className=" opacity-70" />
            <span>{likedCount}</span>
          </div>
        )}
        {!hiddenDate && (
          <time dateTime={post.createdAt.toString()} className="absolute bottom-1 right-3 text-gray">
            {diffTime}
          </time>
        )}
      </div>
    </article>
  )
}

export default PostItem
