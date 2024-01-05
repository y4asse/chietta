'use client'

import { addComment } from '@/app/entry/[url]/_actions/actions'
import { Entry } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CommentInput = ({ entry }: { entry: Entry }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const handleClick = async () => {
    if (loading) return
    if (!comment) return alert('コメントを入力してください')
    setLoading(true)
    const { result, error } = await addComment({ content: comment, entryId: entry.id })
    if (error) return alert(error)
    setLoading(false)
    setComment('')
    router.refresh()
  }
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  return (
    <div className="p-3">
      {session ? (
        <div>
          <img src={session.user.image ? session.user.image : ''} alt="ユーザアイコン" width={50} height={50} />
        </div>
      ) : (
        <div className="h-[50px]" />
      )}
      <textarea
        onChange={(e) => setComment(e.target.value)}
        name="コメント"
        id="commnet"
        rows={5}
        value={comment}
        className="w-full rounded-xl outline-none p-2 text-base"
        placeholder="コメントを入力..."
        required
      />
      <hr className="text-lightGray" />
      <div className="text-end">
        <button
          onClick={handleClick}
          className={`mt-3 bg-primary text-[white] px-3 py-1 rounded ${loading && 'cursor-not-allowed'}`}
          disabled={loading}
        >
          {loading ? '追加中' : 'コメントを追加'}
        </button>
      </div>
    </div>
  )
}

export default CommentInput
