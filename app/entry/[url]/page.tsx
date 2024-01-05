import CreateEntry from '@/components/entry/CreateEntry'
import EntryItem from '@/components/entry/EntryItem'
import { getEntry } from '@/server/entry/getEntry'

const Entry = async ({ params }: { params: { url: string } }) => {
  const url = decodeURIComponent(params.url)
  const entry = await getEntry({ url })
  if (!entry) return <CreateEntry url={url} />

  return (
    <div className="mx-auto max-w-[1000px] px-3 mt-5 pb-10 min-h-[calc(100vh-320px)]">
      <EntryItem entry={entry} url={url} />
      <hr className="text-lightGray mt-5" />
    </div>
  )
}

export default Entry
