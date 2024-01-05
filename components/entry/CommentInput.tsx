'use client'

import { addComment } from '@/app/entry/[url]/_actions/actions'
import { Entry } from '@prisma/client'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CommentInput = ({ entry, session }: { entry: Entry; session: Session | null }) => {
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
  const [comment, setComment] = useState('')
  return (
    <div className="p-3">
      {session && (
        <div>
          <img
            className="rounded-full"
            src={session.user.image ? session.user.image : ''}
            alt="ユーザアイコン"
            width={50}
            height={50}
          />
        </div>
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
        {session ? (
          <button
            onClick={handleClick}
            className={`mt-3 bg-primary text-[white] px-3 py-1 rounded ${loading && 'cursor-not-allowed'}`}
            disabled={loading}
          >
            {loading ? '追加中' : 'コメントを追加'}
          </button>
        ) : (
          <button
            onClick={() =>
              router.push(
                `/login?callbackUrl=${process.env.NEXT_PUBLIC_FRONT_URL}/entry/${encodeURIComponent(entry.url)}`
              )
            }
            className="mt-3 bg-primary text-[white] px-3 py-1 rounded"
          >
            ログイン
          </button>
        )}
      </div>
    </div>
  )
}

export default CommentInput
