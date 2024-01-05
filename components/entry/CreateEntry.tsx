import { getOgp } from '@/server/getOgp'
import Link from 'next/link'
import PostLink from '../tech/PostLink'
import CreateEntryButton from './CreateEntryButton'

const CreateEntry = async ({ url }: { url: string }) => {
  const ogp = await getOgp(url)
  const title = ogp ? (ogp.ogTitle ? ogp.ogTitle : null) : null
  const image = ogp ? (ogp.ogImage ? ogp.ogImage[0].url : null) : null
  return (
    <div className="mx-auto max-w-[1000px] px-3 mt-5 pb-10 min-h-[calc(100vh-320px)]">
      <div className="flex flex-wrap gap-5">
        <div className="w-full md:w-[calc(100%_-_320px)]">
          <h1 className="text-xl font-bold">
            <Link href={url} className="hover:underline" target="_blank">
              {title ? title : url}
            </Link>
          </h1>
          <p className="text-sm text-gray pt-1">{url}</p>
        </div>
        <div className="w-[300px] mx-auto overflow-hidden rounded-xl">
          {image && <PostLink url={url} image_url={image} />}
        </div>
      </div>
      <hr className="text-lightGray mt-5" />
      <div className="text-center mt-5">
        <p className="text-gray">このURLはまだ登録されていません。登録しますか？</p>
        <CreateEntryButton url={url} title={title} image={image} />
      </div>
    </div>
  )
}

export default CreateEntry
