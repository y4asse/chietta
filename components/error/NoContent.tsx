import Image from 'next/image'

const NoContent = ({ text }: { text: string }) => {
  return (
    <div className="dark:bg-lightDark dark:text-white min-h-screen pt-20">
      <h1 className="text-center text-xl font-bold">{text}</h1>
      <Image src="/img/cat.png" alt="猫の画像" width={300} height={300} className="mx-auto" />
    </div>
  )
}

export default NoContent
