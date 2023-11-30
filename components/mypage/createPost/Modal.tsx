'use client'
import CheckAnimation from './CheckAnimation'
import { FaXTwitter } from 'react-icons/fa6'

const Modal = ({ closeDialog, url, content }: { closeDialog: () => void; url: string; content: string }) => {
  const handleX = () => {
    const text = content
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
    window.open(twitterUrl, '_blank')
  }
  return (
    <div onClick={(e) => e.stopPropagation()} className="px-20 py-5 text-center relative">
      <div className="font-bold text-center">投稿が完了しました</div>
      <div className="w-[100px] mx-auto scale-[2] my-10">
        <CheckAnimation />
      </div>
      <button className="text-3xl" onClick={handleX}>
        <FaXTwitter />
      </button>
      <button
        onClick={closeDialog}
        type="button"
        className="absolute top-3 right-3"
        data-dismiss-target="#toast-default"
        aria-label="Close"
      >
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  )
}

export default Modal
