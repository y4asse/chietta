import WithdrawalButton from '@/components/auth/WithdrawalButton'
import Logo from '@/components/layout/Logo'
import WrapContainer from '@/components/layout/WrapContainer'
import React from 'react'

const Logout = () => {
  return (
    <div className="min-h-screen bg-pink dark:bg-lightDark pt-16">
      <WrapContainer>
        <div className="bg-white dark:bg-lightDark border border-lightGray dark:border-gray dark:text-white py-10 px-5 rounded-xl max-w-[400px] mx-auto">
          <div className="flex justify-center">
            <Logo />
          </div>
          <WithdrawalButton />
        </div>
      </WrapContainer>
    </div>
  )
}

export default Logout
