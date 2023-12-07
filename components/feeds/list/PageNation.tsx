import Link from 'next/link'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'

const PageNation = ({ totalCount, page, countPerPage }: { totalCount: number; page: number; countPerPage: number }) => {
  const totalPage = Math.ceil(totalCount / countPerPage)
  const currentPage = page + 1
  return (
    <div className="mt-3 flex justify-center gap-3 items-center">
      {page > 0 && (
        <Link className="bg-[white] border border-lightGray p-2 rounded-xl" href={`/feeds/list/${page - 1}`}>
          <FaArrowLeft />
        </Link>
      )}
      <span>
        {currentPage}/{totalPage}
      </span>
      {page < totalPage - 1 && (
        <Link
          className="bg-[white] border border-lightGray p-2 rounded-xl hover:bg-lightGray duration-200 transition-all"
          href={`/feeds/list/${page + 1}`}
        >
          <FaArrowRight />
        </Link>
      )}
    </div>
  )
}

export default PageNation
