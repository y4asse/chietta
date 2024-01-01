import Image from 'next/image'

const NoTimeline = ({ text }: { text: string }) => {
  return (
    <div>
      <h1 className="text-center mt-5 text-xl font-bold">{text}</h1>
      <Image src="/img/cat.png" alt="猫の画像" width={300} height={300} className="mx-auto" />
    </div>
  )
}

export default NoTimeline
