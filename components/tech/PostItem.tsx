import { format, parseISO } from 'date-fns'
import { Post } from '@prisma/client'
import { zonedTimeToUtc } from 'date-fns-tz'

const PostItem = ({ post }: { post: Post }) => {
  const { image_url, title } = post

  return (
    <article className="rounded-xl border-2 border-[#e6e6e6] bg-[white]  mx-auto w-[340px] overflow-hidden ">
      <a href={post.url} target="_blank">
        <img src={image_url} alt="image" className=" border-b-2 border-[#e6e6e6] mx-auto" />
        <div className="px-[16px] py-[10px]">
          <h1 className="font-bold">{title}</h1>
          <div className="text-right">
            <time>{format(zonedTimeToUtc(post.createdAt.toString(), 'Asia/Tokyo'), 'yyyy/MM/dd HH:mm')}</time>
          </div>
        </div>
      </a>
    </article>
  )
}

export default PostItem
