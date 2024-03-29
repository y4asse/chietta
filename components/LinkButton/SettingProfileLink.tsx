import Link from 'next/link'

const SettingProfileLink = () => {
  return (
    <Link href="/settings/profile" className="rounded bg-primary text-white px-3 py-1 font-semibold">
      プロフィールを編集
    </Link>
  )
}

export default SettingProfileLink
