import { format, parseISO } from 'date-fns'
import { Post } from '@prisma/client'
import ogs from 'open-graph-scraper'

const PostItem = async ({ post }: { post: Post }) => {
  const { url } = post
  const { result: ogp, error } = await ogs({ url }).catch((e) => {
    console.log('error: ' + url)
    return { result: null, error: true }
  })
  if (error)
    return (
      <article className="rounded-xl border-2 border-[#e6e6e6] bg-[white]  mx-auto w-[340px] overflow-hidden ">
        <a href={post.url} target="_blank">
          <img
            src="/img/cat.png"
            className=" border-b-2 border-[#e6e6e6] mx-auto w-full aspect-[16/9] object-contain "
          />
          <div className="px-[16px] py-[10px]">
            <h1 className="font-bold">削除されました</h1>
            <div className="text-right">
              <time>{format(parseISO(post.createdAt.toString()), 'yyyy/MM/dd HH:mm')}</time>
            </div>
          </div>
        </a>
      </article>
    )
  if (!ogp) return
  return (
    <article className="rounded-xl border-2 border-[#e6e6e6] bg-[white]  mx-auto w-[340px] overflow-hidden ">
      <a href={post.url} target="_blank">
        <img src={ogp.ogImage ? ogp.ogImage[0].url : ''} className=" border-b-2 border-[#e6e6e6] mx-auto" />
        <div className="px-[16px] py-[10px]">
          <h1 className="font-bold">{ogp.ogTitle}</h1>
          <div className="text-right">
            <time>{format(parseISO(post.createdAt.toString()), 'yyyy/MM/dd HH:mm')}</time>
          </div>
        </div>
      </a>
    </article>
  )
}

export default PostItem
