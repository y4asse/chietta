import { getComments } from '@/server/entry/getComments'
import ErrorComponent from '../error/ErrorComponent'
import CommentInput from './CommentInput'
import CommentTitle from './CommentTitle'
import { Entry } from '@prisma/client'
import CommentItem from './CommentItem'

const Comment = async ({ entry }: { entry: Entry }) => {
  const comments = await getComments({ entryId: entry.id })
  if (!comments) {
    return <ErrorComponent />
  }
  return (
    <div>
      <div className="border border-lightGray rounded-xl mt-10">
        <CommentTitle exist={comments.length > 0} />
        <CommentInput entry={entry} />
      </div>
      <div className="mt-5">
        {comments.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  )
}

export default Comment
