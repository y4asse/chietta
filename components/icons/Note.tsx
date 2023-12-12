import Image from 'next/image'

const Note = () => {
  return (
    <Image
      src="/img/noteIcon.png"
      alt="noteのアイコン"
      width={24}
      height={24}
      className="border border-[#afafaf] rounded"
    />
  )
}

export default Note
