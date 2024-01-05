'use client'

import { EntryComment } from '@prisma/client'
import Link from 'next/link'

const CommentItem = ({ comment }: { comment: EntryComment & { user: { image: string | null; name: string } } }) => {
  return (
    <div className="flex gap-2 py-3 border-b border-[#e7e7e7] relative">
      <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] border border-lightGray rounded-full overflow-hidden hover:opacity-70 duration-200 transition-all">
        <Link href={`/yasse`} className="">
          <img src={comment.user.image ? comment.user.image : ''} alt="ユーザアイコン" className="" />
        </Link>
      </div>
      <div className="w-[calc(100%-70px)]">
        <div>
          <Link className="font-bold hover:underline" href={`/yasse`}>
            {comment.user.name}
          </Link>
        </div>
        <div>
          <p className="text-sm">{comment.content}</p>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
