import { getUserActivities } from '@/server/timeline/getUserActivities'
import ActivityItem from './ActivityItem'
import NoContent from '@/components/error/NoContent'

const FollowingUserActivityList = async () => {
  const activities = await getUserActivities()
  return (
    <div className="max-w-[1000px] mx-auto">
      {activities ? (
        activities.map((activity) => <ActivityItem key={activity.id} activity={activity} />)
      ) : (
        <NoContent text="アクティビティがありません" />
      )}
    </div>
  )
}

export default FollowingUserActivityList
