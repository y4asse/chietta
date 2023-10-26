'use client'

import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit, MdMoreHoriz } from 'react-icons/md'

const MoreButton = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const deleteHandler = () => {
    console.log('hello')
  }
  const editHandler = () => {
    console.log('hello')
  }
  const moreList = [
    { name: '編集', icon: <MdEdit />, handler: editHandler },
    { name: '削除', icon: <MdDelete />, handler: deleteHandler }
  ]
  const clickHandler = () => {
    console.log(showModal)
    setShowModal(!showModal)
  }

  // 100個あったら100回だけど１回でいい
  //   useEffect(() => {
  //     const handleOutsideClick = (e: MouseEvent) => {
  //       console.log('hello')
  //       if (!e.target) return
  //       // クリックした場所が#tabの外側ならisShowをfalseにする
  //       // closetは自分自身を含むので、!closetで外側を判定できる
  //       if (!(e.target as HTMLElement).closest('#modal')) {
  //         setShowModal(false)
  //       }
  //     }
  //     document.addEventListener('click', handleOutsideClick)
  //     return () => {
  //       document.removeEventListener('click', handleOutsideClick)
  //     }
  //   }, [])

  return (
    <>
      <div className="relative" id="moreModal">
        <button className="text-2xl" onClick={clickHandler}>
          <MdMoreHoriz />
        </button>
        {showModal && (
          <div className="absolute border rounded-xl text-xl border-[#c2c2c2] p-3 bg-[white] top-full right-0 flex flex-col">
            {moreList.map((item, index) => (
              <button key={index} className="flex items-center gap-3 text-gray" onClick={item.handler}>
                {item.icon}
                <p className=" whitespace-nowrap">{item.name}</p>
              </button>
            ))}
          </div>
        )}
      </div>
      <dialog className="absolute top-0 left-0 w-screen h-screen" open={showDeleteModal}>
        hello
      </dialog>
    </>
  )
}

export default MoreButton
