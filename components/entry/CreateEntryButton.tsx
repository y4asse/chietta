'use client'

import { createEntry } from '@/app/entry/[url]/_actions/actions'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const CreateEntryButton = ({ url, title, image }: { url: string; title: string | null; image: string | null }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const handleClick = async () => {
    if (!session)
      return router.push(`/login?callbackUrl=${process.env.NEXT_PUBLIC_FRONT_URL}/entry/${encodeURIComponent(url)}`)
    const { error } = await createEntry({ url, title, image })
    if (error) {
      return alert(error)
    }
    router.refresh()
  }
  return (
    <button onClick={handleClick} className="text-[white] bg-primary px-3 py-1 rounded mt-3">
      登録する
    </button>
  )
}

export default CreateEntryButton
