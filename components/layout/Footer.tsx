import Link from 'next/link'
import React from 'react'
import WrapContainer from './WrapContainer'

const Footer = () => {
  const lists = [
    { link: 'about', text: 'Chiettaとは' },
    { link: 'about/privacy', text: 'プライバシーポリシー' }
  ]
  return (
    <div className=" bg-[white] p-10">
      <WrapContainer>
        <span className="text-xl">Chietta</span>
        <ul className="mt-3 text-gray">
          {lists.map((list, index) => (
            <li key={index} className="mt-1">
              <Link href={`/${list.link}`}>{list.text}</Link>
            </li>
          ))}
          <li>
            <a href="https://twitter.com/y4isse" target="_blank">
              開発者
            </a>
          </li>
        </ul>
      </WrapContainer>
    </div>
  )
}

export default Footer
