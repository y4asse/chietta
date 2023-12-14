'use client'
import { createUserWithId } from '@/app/user/create/_actions/actions'

import SubmitButton from '@/components/feeds/create/SubmitButton'
import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

const initialState = {
  errors: { idCreatedByUser: undefined },
  result: undefined
}

const FormInput = ({ user }: { user: User }) => {
  const [state, action] = useFormState(createUserWithId, initialState)
  const router = useRouter()
  const { update } = useSession()
  useEffect(() => {
    if (state.errors === null) {
      update().then(() => {
        router.push(`/user/${state.result.idCreatedByUser}`)
      })
    }
  }, [state])
  return (
    <form className="flex flex-col justify-center items-center w-full" action={action}>
      <label className="text-xl font-bold mt-10">ユーザIDを入力してください</label>
      <input
        type="text"
        name="idCreatedByUser"
        className="border border-[#b6b6b6] px-5 py-3 rounded-full cursor focus:outline-focus mt-5 md:w-1/2 w-full"
        placeholder="https://chietta.com/あなたのユーザID"
      />
      {state?.errors?.idCreatedByUser && (
        <div>
          {state.errors.idCreatedByUser.map((error) => (
            <p key={error} role="alert" className="text-[red] mt-1">
              {error}
            </p>
          ))}
        </div>
      )}
      <input type="hidden" name="sub" value={user.id} />
      <div className="mt-5">
        <SubmitButton text="作成" pendingText="作成中" />
      </div>
    </form>
  )
}

export default FormInput
