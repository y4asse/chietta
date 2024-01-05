'use client'

import { createEntry } from '@/app/entry/_actions/actions'
import { useRouter } from 'next/navigation'

const CreateEntryButton = ({ url, title, image }: { url: string; title: string | null; image: string | null }) => {
  const router = useRouter()
  const handleClick = async () => {
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
