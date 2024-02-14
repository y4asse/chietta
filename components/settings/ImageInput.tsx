'use client'

import { useRef, useState } from 'react'
import { storage } from '@/utils/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { updateUserIcon } from '@/app/settings/profile/action'
import { useSession } from 'next-auth/react'
import Toast from '../utils/Toast'
import { usePathname, useRouter } from 'next/navigation'

const ImageInput = () => {
  const { data: session, update } = useSession()
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [createObjectURL, setCreateObjectURL] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const path = usePathname()

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    if (file) {
      if (!file.type.startsWith('image/')) return alert('画像ファイルを選択してください。')
      if (file.size > 1024 * 1024 * 5) return alert('5MB以下の画像を選択してください。')
      setImageFile(file)
      setCreateObjectURL(URL.createObjectURL(file))
      dialogRef.current?.showModal()
    }
  }

  const handleImageClick = () => {
    imageInputRef.current?.click()
  }

  const closeDialog = () => {
    dialogRef.current?.close()
  }

  const handleUpdate = async () => {
    if (!session) return
    if (imageFile) {
      const imageRef = ref(storage, `images/${imageFile.name}`)
      try {
        const snapshot = await uploadBytes(imageRef, imageFile)
        const downloadURL = await getDownloadURL(snapshot.ref)
        await updateUserIcon({ userId: session.user.id, imageUrl: downloadURL })
        closeDialog()
        setIsOpen(true)
        update()
      } catch (error) {
        alert('サーバーエラーが発生しました。')
      }
    }
  }
  if (session === null) return
  return (
    <div>
      <Toast content="更新しました" setIsOpen={setIsOpen} isOpen={isOpen} />
      <input
        type="file"
        aria-label="プロフィール画像を選択"
        id="image"
        accept="image/*"
        className="hidden"
        ref={imageInputRef}
        onInput={handleInput}
      />
      <div className="text-center">
        <img
          src={session.user.image ? session.user.image : ''}
          className="w-[120px] h-[120px] rounded-full border border-[#afafaf] dark:border-gray overflow-hidden hover:opacity-80 duration-200 transition-all mx-auto"
          role="button"
          onClick={handleImageClick}
        />
        <button type="button" className="mt-3 text-gray font-bold dark:text-lightGray" onClick={handleImageClick}>
          変更する
        </button>
      </div>

      <dialog
        className="relative backdrop:bg-black backdrop:bg-opacity-70 rounded-lg"
        ref={dialogRef}
        onClick={() => {
          closeDialog()
        }}
      >
        <button
          role="button"
          type="button"
          className="absolute top-1 right-1 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          aria-label="Close modal"
          onClick={() => closeDialog()}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
        <div onClick={(e) => e.stopPropagation()} className="px-20 py-10">
          <img
            src={createObjectURL ? createObjectURL : ''}
            alt="icon preview"
            className="w-[200px] h-[200px] rounded-full m-auto border border-[#afafaf]"
          />
          <div className="text-center mt-10">
            <button type="button" onClick={handleUpdate} className="text-white font-bold bg-primary px-3 py-1 rounded">
              画像を更新
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default ImageInput
