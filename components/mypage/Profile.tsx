import { Follow, User } from '@prisma/client'
import { User as SessionUser } from 'next-auth'
import React from 'react'
import SnsList from './SnsList'
import SettingProfileLink from '../LinkButton/SettingProfileLink'
import FollowButton from './FollowButton'

const Profile = ({ user, sessionUser }: { user: User & { Followers: Follow[] }; sessionUser: SessionUser | null }) => {
  const defaultFollow = sessionUser ? user.Followers.some((follower) => follower.user_id === sessionUser.id) : false
  return (
    <div className="max-w-[1000px] w-full mx-auto flex flex-wrap p-3 mb-5 gap-5">
      <img
        src={user.image!}
        alt="ユーザアイコン"
        className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-full mx-auto border border-[#afafaf]"
      />
      <div className="w-full md:w-2/3">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="mt-5 text-gray">{user.introduction ?? '自己紹介がありません'}</p>
        {sessionUser && (
          <div className="mt-5">
            {user.id === sessionUser.id ? (
              <SettingProfileLink />
            ) : (
              <FollowButton userId={user.id} sessionUserId={sessionUser.id} defaultFollow={defaultFollow} />
            )}
          </div>
        )}
        <SnsList user={user} />
      </div>
    </div>
  )
}

export default Profile
