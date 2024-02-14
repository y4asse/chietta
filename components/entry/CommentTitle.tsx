import { FaRegComment } from 'react-icons/fa'
import Image from 'next/image'
const CommentTitle = ({ exist }: { exist: boolean }) => {
  return (
    <div className="border-b border-lightGray dark:border-gray pt-3">
      <div className="flex items-center justify-center text-center font-bold md:text-xl gap-3 text-lg">
        コメント
        <FaRegComment />
      </div>
      {!exist && (
        <div className="pb-3">
          <Image
            src="/img/discussion.png"
            width={300}
            height={300}
            alt={'discussionの画像'}
            className="mx-auto rounded-full my-3 bg-white"
          />
          <p className="text-gray dark:text-lightGray text-center mt-3">
            まだコメントがありません。 最初のコメントをしてみましょう！
          </p>
        </div>
      )}
    </div>
  )
}

export default CommentTitle
