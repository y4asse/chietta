import { notFound, redirect } from 'next/navigation'

const Page = ({ searchParams }: { searchParams: { url: string } }) => {
  const { url } = searchParams
  if (!url) notFound()
  return redirect(`/entry/${encodeURIComponent(url)}`)
}

export default Page
