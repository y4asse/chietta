import Link from 'next/link'
import React from 'react'

const Footer = () => {
  const lists = [{ link: 'about', text: 'Chiettaとは' }]
  return (
    <div className=" bg-pink p-10">
      <span className="text-xl">Chietta</span>
      <ul className="mt-3 text-gray">
        {lists.map((list, index) => (
          <li key={index}>
            <Link href={`/${list.link}`}>{list.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Footer
