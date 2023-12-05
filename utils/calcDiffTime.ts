import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import dayjs from 'dayjs'

dayjs.extend(utc)
dayjs.extend(timezone)

export const calcDiffTime = (date: string) => {
  const now = new Date()
  const from = new Date(date)
  const diff = now.getTime() - from.getTime()
  const diffMonth = Math.floor(diff / (1000 * 60 * 60 * 24 * 30))
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diff / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diff / (1000 * 60))
  const diffSeconds = Math.floor(diff / 1000)
  const displayDate = dayjs(date).tz('Asia/Tokyo').format('YYYY/M/D HH:mm')

  if (diffMonth > 0) {
    return displayDate
  } else if (diffDays > 0) {
    return `${diffDays}日前`
  } else if (diffHours > 0) {
    return `${diffHours}時間前`
  } else if (diffMinutes > 0) {
    return `${diffMinutes}分前`
  } else {
    return 'たった今'
  }
}
