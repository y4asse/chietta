import Link from 'next/link'
import PostLink from '../tech/PostLink'

const Article = ({ url, image, title }: { url: string; image: string | null; title: string | null }) => {
  return (
    <div className="mt-2 border border-lightGray dark:border-gray rounded-xl p-3">
      <Link href={`/entry/${encodeURIComponent(url)}`} className="font-bold hover:underline">
        {title}
      </Link>
      <div className="w-full max-w-[500px] mx-auto rounded-xl overflow-hidden my-5">
        <PostLink url={url} image={image} />
      </div>
    </div>
  )
}

export default Article
