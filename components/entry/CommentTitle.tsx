import { FaRegComment } from 'react-icons/fa'
import Image from 'next/image'
const CommentTitle = ({ exist }: { exist: boolean }) => {
  return (
    <div className="border-b border-lightGray py-3">
      <div className="flex items-center justify-center text-center font-bold md:text-xl gap-3 text-lg">
        コメント
        <FaRegComment />
      </div>
      {!exist && (
        <div>
          <Image src="/img/discussion.png" width={300} height={300} alt={'discussionの画像'} className="mx-auto" />
          <p className="text-gray text-center mt-1">まだコメントがありません。 最初のコメントをしてみましょう！</p>
        </div>
      )}
    </div>
  )
}

export default CommentTitle
