import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const list = [
    { name: 'Qiita/Zenn', path: '' },
    { name: 'フィード', path: '/feeds' }
  ]
  return (
    <main className="min-h-screen min-w-[300px] bg-main items-center py-10">
      <h1 className="text-center text-3xl font-bold my-5">新着の企業ブログ</h1>
      {/* <div className="flex justify-center gap-3 items-center my-7">
        {list.map((item) => {
          const isActive = '/latest' + item.path === pathname
          return (
            <Link
              key={item.name}
              href={`/latest${item.path}`}
              className={`py-1 px-3 rounded-xl border border-[#c7c7c7] bg-[white] ${
                isActive ? 'bg-[#b1b1b1] text-[white] border-none' : ''
              }`}
            >
              {item.name}
            </Link>
          )
        })}
      </div> */}
      {children}
    </main>
  )
}

export default Layout
