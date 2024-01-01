import React, { Suspense } from 'react'
import Input from '@/components/search/Input'
import SearchList from '@/components/search/SearchList'
import Spinner from '@/components/search/Spinner'

const Search = ({ searchParams }: { searchParams: { q: string } }) => {
  const { q } = searchParams
  return (
    <div className="py-10 border-b border-[#cacaca] min-h-screen bg-main">
      <Input q={q} />
      <Suspense fallback={<Spinner />}>
        <SearchList q={q} />
      </Suspense>
    </div>
  )
}

export default Search
