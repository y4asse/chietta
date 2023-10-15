import Link from 'next/link'
import React from 'react'
import WrapContainer from './WrapContainer'

const Footer = () => {
  const lists = [{ link: 'about', text: 'Chiettaとは' }]
  return (
    <div className=" bg-[white] p-10">
      <WrapContainer>
        <span className="text-xl">Chietta</span>
        <ul className="mt-3 text-gray">
          {lists.map((list, index) => (
            <li key={index}>
              <Link href={`/${list.link}`}>{list.text}</Link>
            </li>
          ))}
        </ul>
      </WrapContainer>
    </div>
  )
}

export default Footer
