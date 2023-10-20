import { ReturnPost } from '@/app/api/post/route'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import dayjs from 'dayjs'
import Image from 'next/image'

dayjs.extend(utc)
dayjs.extend(timezone)

const PostItem = ({ post }: { post: ReturnPost }) => {
  const { image_url, title, likedCount } = post
  const createdAt = post.createdAt.toString()
  const date = dayjs(createdAt).tz('Asia/Tokyo').format('YYYY/M/D/ HH:mm')

  return (
    <article className="rounded-xl border-2 border-[#e6e6e6] bg-[white]  mx-auto w-[340px]  overflow-hidden relative">
      <a href={post.url}>
        <img src={image_url} alt="image" className=" border-b-2 border-[#e6e6e6] w-full" />
      </a>
      <div className="px-[16px] py-[10px] mb-10">
        <h1 className="font-bold">{title}</h1>
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
