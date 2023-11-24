const SubmitButton = ({ pending }: { pending: boolean }) => {
  return (
    <button
      disabled={pending}
      type="submit"
      className={`rounded bg-primary text-[white] px-3 py-1 font-semibold ${pending && 'cursor-not-allowed'}`}
    >
      {pending ? '保存中...' : '保存'}
    </button>
  )
}

export default SubmitButton
