const AddCommentButton = ({ handleClick, loading }: { handleClick: () => void; loading: boolean }) => {
  return (
    <button
      onClick={handleClick}
      className={`mt-3 bg-primary text-[white] px-3 py-1 rounded ${loading && 'cursor-not-allowed'}`}
      disabled={loading}
    >
      {loading ? '追加中' : 'コメントを追加'}
    </button>
  )
}

export default AddCommentButton
