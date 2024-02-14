import Link from 'next/link'

const UserIcon = ({ image, idCreatedByUser }: { image: string | null; idCreatedByUser: string }) => {
  return (
    <Link href={`/${idCreatedByUser}`} className="hover:opacity-70">
      <img
        src={image ? image : '/img/user-icon.png'}
        alt="ユーザアイコン"
        className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full mx-auto border border-lightGray dark:border-gray"
      />
    </Link>
  )
}

export default UserIcon
