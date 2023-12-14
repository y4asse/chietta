'use client'

import { useFormStatus } from 'react-dom'

const SubmitButton = ({ text, pendingText }: { text: string; pendingText: string }) => {
  const { pending } = useFormStatus()
  return (
    <input
      disabled={pending}
      role="button"
      type="submit"
      value={pending ? pendingText : text}
      className={`rounded bg-primary text-[white] px-3 py-1 font-semibold ${pending && 'cursor-not-allowed'}`}
    />
  )
}

export default SubmitButton
