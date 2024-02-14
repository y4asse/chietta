'use client'

import { FaCheck } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
const Toast = ({
  content,
  setIsOpen,
  isOpen
}: {
  content: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, translateY: 50, translateX: '-50%' }}
          animate={{ opacity: 1, translateY: 0, translateX: '-50%' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          exit={{ opacity: 0, translateY: 50, translateX: '-50%' }}
          id="toast-default"
          className="fixed bg-primary text-white bottom-5 left-1/2 flex items-center w-full max-w-xs p-4 text-gray-500 rounded-lg shadow-xl dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
            <FaCheck />
          </div>
          <div className="ms-3 text-xl font-bold">{content}</div>
          <button
            onClick={() => setIsOpen(false)}
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 hover:text-lightGray rounded-lg focus:ring-2 focus:ring-primary p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-default"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
