import { getNotifications } from '@/app/_actions/actions'
import { Activity } from '@prisma/client'
import { Session } from 'next-auth'
import { useEffect, useState } from 'react'

export const useNotification = (session: Session) => {
  const userId = session.user.id
  const [notifications, setNotifications] = useState<NonNullable<Activity>[]>([])
  useEffect(() => {
    const fetchNotifications = async () => {
      const { notifications } = await getNotifications()
      if (!notifications) return
      setNotifications(notifications)
    }
    fetchNotifications()
  }, [])
  return { notifications }
}
