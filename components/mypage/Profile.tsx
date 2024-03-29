'use client'

import React from 'react'
import SnsList from './SnsList'
import SettingProfileLink from '../LinkButton/SettingProfileLink'
import FollowButton from './FollowButton'
import Following from './Following'
import { UserType } from '@/server/userPage/getUser'
import { useSession } from 'next-auth/react'

type Props = {
  user: NonNullable<UserType>
}

const Profile = ({ user }: Props) => {
  const { data: session } = useSession()
  const sessionUser = session ? session.user : null
  const defaultFollow = sessionUser ? user.Followers.some((follower) => follower.user_id === sessionUser.id) : false
  if (!user.idCreatedByUser) return
  return (
    <div className="max-w-[1000px] w-full mx-auto flex flex-wrap p-3 mb-5 gap-1 md:gap-5">
      <img
        src={user.image!}
        alt="ユーザアイコン"
        className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-full mx-auto border border-[#afafaf] dark:border-gray"
      />
      <div className="w-full md:w-2/3">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="mt-5 text-gray dark:text-lightGray">{user.introduction ?? '自己紹介がありません'}</p>
        <Following
          followersCount={user.Followers.length}
          followingCount={user.Follow.length}
          userName={user.idCreatedByUser}
        />
        {sessionUser ? (
          <div className="mt-5">
            {user.id === sessionUser.id ? (
              <SettingProfileLink />
            ) : (
              <FollowButton userId={user.id} sessionUserId={sessionUser.id} defaultFollow={defaultFollow} />
            )}
          </div>
        ) : (
          <div className="h-6 py-1 mt-5" />
        )}
        <SnsList user={user} />
      </div>
    </div>
  )
}

export default Profile
