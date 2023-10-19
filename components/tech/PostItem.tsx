import { ReturnPost } from '@/app/api/post/route'
import { format } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'

const PostItem = ({ post }: { post: ReturnPost }) => {
  const { image_url, title } = post
  const createdAt = post.createdAt.toString()
  const date = zonedTimeToUtc(new Date(createdAt), 'Asia/Tokyo')

  return (
    <article className="rounded-xl border-2 border-[#e6e6e6] bg-[white]  mx-auto w-[340px]  overflow-hidden relative">
      <a href={post.url}>
        <img src={image_url} alt="image" className=" border-b-2 border-[#e6e6e6] w-full" />
      </a>
      <div className="px-[16px] py-[10px] mb-7">
        <h1 className="font-bold">{title}</h1>
        <time className="absolute bottom-1 right-3 text-gray">{format(date, 'yyyy/MM/dd HH:mm')}</time>
      </div>
    </article>
  )
}

export default PostItem
