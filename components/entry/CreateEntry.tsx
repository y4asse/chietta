import { getOgp } from '@/server/getOgp'
import CreateEntryButton from './CreateEntryButton'
import EntryInfo from './EntryInfo'

const CreateEntry = async ({ url }: { url: string }) => {
  const ogp = await getOgp(url)
  const title = ogp ? (ogp.ogTitle ? ogp.ogTitle : null) : null
  const image = ogp ? (ogp.ogImage ? ogp.ogImage[0].url : null) : null
  return (
    <div className="dark:bg-lightDark pt-5 dark:text-white">
      <div className="mx-auto max-w-[1000px] px-3 pb-10 min-h-[calc(100vh-320px)]">
        <EntryInfo url={url} title={title} image={image} />
        <hr className="text-lightGray mt-5" />
        <div className="text-center mt-5">
          <p className="text-gray dark:text-lightGray">このURLはまだ登録されていません。登録しますか？</p>
          <CreateEntryButton url={url} title={title} image={image} />
        </div>
      </div>
    </div>
  )
}

export default CreateEntry
