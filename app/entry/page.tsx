import { redirect } from 'next/navigation'

const Page = ({ searchParams }: { searchParams: { url: string } }) => {
  const { url } = searchParams
  return redirect(`/entry/${encodeURIComponent(url)}`)
}

export default Page
