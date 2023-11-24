import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <>
      <div className="p-10 flex justify-between border border-[#afafaf] rounded-xl mt-10">
        <div className="text-lg font-bold">アカウントの退会</div>
        <Link className="font-bold rounded px-3 py-1 bg-primary text-[white]" href={'/withdrawal'}>
          退会する
        </Link>
      </div>
    </>
  )
}

export default Page
