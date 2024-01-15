'server only'

import { getServerSession } from 'next-auth'
import PostLink from '../tech/PostLink'
import EntryLink from './EntryLink'
import { authOptions } from '@/server/auth'
const EntryInfo = async ({ url, title, image }: { image: string | null; url: string; title: string | null }) => {
  const session = await getServerSession(authOptions)
  return (
    <div className="flex flex-wrap gap-5">
      <div className={`w-full ${image && 'md:w-[calc(100%_-_320px)]'}`}>
        <h1 className="text-xl font-bold break-all">
          <EntryLink session={session} url={url} title={title} image={image} />
        </h1>
        <p className="text-sm text-gray pt-1 break-all">{url}</p>
      </div>
      <div className="w-[300px] mx-auto overflow-hidden rounded-xl">
        {image && <PostLink url={url} image={image} />}
      </div>
    </div>
  )
}

export default EntryInfo
