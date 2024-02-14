'use client'

import Link from 'next/link'

const MoreMenu = ({
  list
}: {
  list: { name: string; path?: string; icon: React.JSX.Element; handleClick?: () => void }[]
}) => {
  return (
    <div className="relative" id="modal">
      <div className="shadow rounded-xl flex flex-col absolute z-20 bg-white dark:bg-lightDark w-[200px] top-full right-0 text-gray">
        {list.map((item) => {
          if (item.path) {
            return (
              <Link
                aria-label={item.name}
                className="flex items-center px-5 py-2 gap-3 text-xl hover:bg-lightGray dark:hover:bg-gray dark:text-white duration-200 transition-all rounded"
                key={item.name}
                href={item.path}
              >
                {item.icon}
                <span className="text-lg">{item.name}</span>
              </Link>
            )
          } else if (item.handleClick) {
            return (
              <button
                aria-label={item.name}
                className="flex items-center px-5 py-2 gap-3 text-xl hover:bg-lightGray dark:hover:bg-gray dark:text-white duration-200 transition-all rounded"
                key={item.name}
                onClick={item.handleClick}
              >
                {item.icon}
                <span className="text-lg">{item.name}</span>
              </button>
            )
          }
        })}
      </div>
    </div>
  )
}

export default MoreMenu
