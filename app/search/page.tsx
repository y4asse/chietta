import React, { Suspense } from 'react'
import Input from '@/components/search/Input'
import SearchList from '@/components/search/SearchList'
import Spinner from '@/components/search/Spinner'

const Search = ({ searchParams }: { searchParams: { q: string } }) => {
  const { q } = searchParams
  return (
    <div className="py-10 border-b border-[#cacaca] min-h-screen bg-main">
      <div className="max-w-[1000px] mx-auto">
        <Input q={q} />
        {!q && <h1 className="text-2xl font-bold text-center mt-5">検索してみましょう</h1>}
        <Suspense fallback={<Spinner />}>
          <SearchList q={q} />
        </Suspense>
      </div>
    </div>
  )
}

export default Search
