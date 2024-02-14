import Link from 'next/link'
import React from 'react'
import WrapContainer from './WrapContainer'

const Footer = () => {
  const lists = [
    { link: 'about', text: 'Chiettaとは' },
    { link: 'about/privacy', text: 'プライバシーポリシー' }
  ]
  return (
    <div className=" bg-white dark:bg-dark dark:text-white p-10">
      <WrapContainer>
        <span className="text-xl">Chietta</span>
        <ul className="mt-3 text-gray dark:text-lightGray">
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
        <p className="text-gray  text-center">Copyright 2024 y4asse</p>
      </WrapContainer>
    </div>
  )
}

export default Footer
