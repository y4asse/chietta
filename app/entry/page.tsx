import NoContent from '@/components/error/NoContent'
import { notFound, redirect } from 'next/navigation'

const Page = ({ searchParams }: { searchParams: { url: string } }) => {
  const { url } = searchParams
  try {
    new URL(url)
  } catch (e) {
    return <NoContent text="不正なURLです" />
  }
  if (!url) notFound()
  return redirect(`/entry/${encodeURIComponent(url)}`)
}

export default Page
