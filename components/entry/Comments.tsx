import Link from 'next/link'
import { FaRegComment } from 'react-icons/fa'

const Comments = () => {
  return (
    <div>
      <div className="flex items-center justify-center text-center font-bold text-xl mt-5 gap-3">
        <span>コメント</span>
        <FaRegComment />
      </div>
      <div className="mt-5">
        <div className="flex gap-2">
          <div className="w-[50px] h-[50px] border border-lightGray rounded-full overflow-hidden hover:opacity-70 duration-200 transition-all">
            <Link href={`/yasse`} className="">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/cheeta-38f77.appspot.com/o/images%2FOIG%20(1).jpg?alt=media&token=f59efd9c-eeeb-43f0-abfa-73080106fe57"
                alt="ユーザアイコン"
                className=" "
              />
            </Link>
          </div>
          <div className="w-[calc(100%-58px)]">
            <div>
              <Link className="font-bold hover:underline" href={`/yasse`}>
                やせやせやせやせやせやせやせやせやせやせやせやせやせやせやせやせやせやせ
              </Link>
            </div>
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, quibusdam, eos incidunt dicta adipisci,
              quod rem ipsam voluptatum quidem autem voluptas error reiciendis possimus itaque obcaecati voluptatibus
              aliquam! Et, libero.
            </div>
            {/* <LikeButton/> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comments
