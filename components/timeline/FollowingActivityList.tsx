import { getUserActivities } from '@/server/timeline/getUserActivities'
import ActivityItem from './ActivityItem'
import NoContent from '@/components/error/NoContent'
import ErrorComponent from '../error/ErrorComponent'

const FollowingUserActivityList = async () => {
  const activities = await getUserActivities()
  if (!activities) return <ErrorComponent />
  return (
    <div className="max-w-[1000px] mx-auto">
      {activities?.length > 0 ? (
        activities.map((activity) => <ActivityItem key={activity.id} activity={activity} />)
      ) : (
        <NoContent text="フォロー中のユーザのアクティビティがありません" />
      )}
    </div>
  )
}

export default FollowingUserActivityList
