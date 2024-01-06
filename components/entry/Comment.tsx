import { getComments } from '@/server/entry/getComments'
import ErrorComponent from '../error/ErrorComponent'
import CommentInput from './CommentInput'
import CommentTitle from './CommentTitle'
import { Entry } from '@prisma/client'
import CommentItem from './CommentItem'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/server/auth'

const Comment = async ({ entry }: { entry: Entry }) => {
  const comments = await getComments({ entryId: entry.id })
  const session = await getServerSession(authOptions)
  if (!comments) {
    return <ErrorComponent />
  }
  return (
    <div>
      <div className="border border-lightGray rounded-xl mt-10">
        <CommentTitle exist={comments.length > 0} />
        <CommentInput entry={entry} session={session} />
      </div>
      <div className="mt-5">
        {comments.map((comment) => {
          const isMine = session?.user.id === comment.user.id
          return <CommentItem comment={comment} key={comment.id} isMine={isMine} />
        })}
      </div>
    </div>
  )
}

export default Comment
