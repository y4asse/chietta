import { useFormStatus } from 'react-dom'

const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <input
      disabled={pending}
      role="button"
      type="submit"
      value={pending ? '登録中...' : 'フィードを登録'}
      className={`rounded bg-primary text-[white] px-3 py-1 font-semibold ${pending && 'cursor-not-allowed'}`}
    />
  )
}

export default SubmitButton
