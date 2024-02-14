import { UserActivitis } from '@/server/timeline/getUserActivities'
import CommentActivity from './CommentActivity'
import FollowActivity from './FollowActivity'
import BookmarkActivity from './BookmarkActivity'

const ActivityItem = ({ activity }: { activity: NonNullable<UserActivitis>[number] }) => {
  return (
    <div className="md:border border-lightGray dark:border-gray bg-white dark:bg-lightDark dark:bg-lightDark dark:border-gray md:rounded-xl flex p-3 md:p-5 md:mt-5">
      {activity.entryComment && activity.entry_comment_id && (
        <CommentActivity entryComment={activity.entryComment} user={activity.user} />
      )}
      {activity.follow && activity.follow.following_user && (
        <FollowActivity follow={activity.follow} user={activity.user} />
      )}
      {activity.bookmark && activity.bookmark.entry && (
        <BookmarkActivity bookmark={activity.bookmark} user={activity.user} />
      )}
    </div>
  )
}

export default ActivityItem
