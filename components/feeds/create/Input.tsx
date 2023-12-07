'use client'

import { createFeed } from '@/app/feeds/create/_action/actions'
import { useSession } from 'next-auth/react'
import { useFormState } from 'react-dom'

const initialState = {
  message: '',
  result: undefined
}
const Input = () => {
  const { data: session } = useSession()
  const [state, actions] = useFormState(createFeed, initialState)
  return (
    <form className="" action={actions}>
      <div>
        <label htmlFor="feedUrl">フィードURL</label>
        <input
          required
          type="url"
          className="border-[#afafaf] border px-3 py-1 rounded w-full outline-primary mt-1"
          placeholder="フィードのURLを入力..."
          name="feedUrl"
          id="feedUrl"
        />
        {state?.message && (
          <p role="alert" className="text-[red] mt-1">
            {state.message}
          </p>
        )}
      </div>
      {session && <input type="hidden" name="userId" value={session.user.id} />}
      <div className="mt-10 text-center">
        <input
          role="button"
          type="submit"
          value="フィードを登録"
          className="bg-primary text-[white] rounded px-3 py-1"
        />
      </div>
    </form>
  )
}

export default Input
