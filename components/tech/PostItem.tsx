'use client'

import PostLink from './PostLink'
import { PostItemType } from '@/types/postItem'
import { useAtom } from 'jotai'
import { viewHistoryAtom } from '@/jotai/viewHistory'
import { calcDiffTime } from '@/utils/calcDiffTime'
import Link from 'next/link'
import BookmarkButton from './BookmarkButton'
import { FaRegHeart } from 'react-icons/fa6'

const PostItem = ({ post, hiddenDate }: { post: PostItemType; hiddenDate?: boolean }) => {
  const { title, likedCount } = post
  const [viewHistory] = useAtom(viewHistoryAtom)
  const isViewed = viewHistory.some((url) => url === post.url)
  const { feed } = post
  const diffTime = calcDiffTime(post.createdAt.toString())
  return (
    <article
      className={`rounded-xl border-2 border-[#e6e6e6] dark:border-black bg-white dark:bg-lightDark dark:text-white  mx-auto w-[344px] overflow-hidden relative transition-all duration-300 ${
        isViewed && 'brightness-[0.9]'
      }`}
    >
      <PostLink url={post.url} image={post.image} isViewed={isViewed} />
      <div className="px-[16px] py-[10px] mb-10">
        <h1>
          <Link href={`/entry/${encodeURIComponent(post.url)}`} className="font-bold hover:underline">
            {title ? title : post.url}
          </Link>
        </h1>
        {feed && (
          <Link href={`/feeds/${post.feed!.id}`} className="text-sm text-gray dark:text-lightGray pt-3 hover:underline">
            {feed.name}
          </Link>
        )}
        {likedCount != undefined && (
          <div className="flex items-center gap-1 mt-1">
            <FaRegHeart width={17} height={17} className="text-gray dark:text-white opacity-70" />
            <span>{likedCount}</span>
          </div>
        )}
        <div className="absolute bottom-2 left-3  text-gray dark:text-lightGray flex items-center justify-center gap-3">
          <BookmarkButton url={post.url} />
        </div>
        {!hiddenDate && (
          <time
            dateTime={post.createdAt.toString()}
            className="absolute bottom-1 right-3 text-gray dark:text-lightGray"
          >
            {diffTime}
          </time>
        )}
      </div>
    </article>
  )
}

export default PostItem
