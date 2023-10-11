import { format, parseISO } from 'date-fns'
import { Post } from '@prisma/client'
import ogs from 'open-graph-scraper'

const PostItem = async ({ post }: { post: Post }) => {
  const { url } = post
  const { result: ogp } = await ogs({ url })
  return (
    <div className="w-screen overflow-hidden  px-5 py-5 text-left">
      <div className="overflow-hidden rounded-xl border-2 border-[#e6e6e6] bg-[white]">
        <a href={post.url} target="_blank">
          <img src={ogp.ogImage ? ogp.ogImage[0].url : ''} className=" border-b-2 border-[#e6e6e6]" />
          <div className="px-[16px] py-[10px]">
            <h1 className="font-bold">{ogp.ogTitle}</h1>
            <div className="text-right">
              <time>{format(parseISO(post.createdAt.toString()), 'yyyy/MM/dd HH:mm')}</time>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default PostItem
