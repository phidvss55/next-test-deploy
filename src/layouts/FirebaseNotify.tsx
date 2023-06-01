import React, { useEffect } from 'react'
import { getMessaging, getToken } from 'firebase/messaging'
import { app } from '@/utils/firebase'
// import { messaging } from '@/utils/firebase'

const FirebaseNotify = () => {
  const requestPermission = async () => {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      const messaging = getMessaging(app)

      const token = await getToken(messaging, {
        vapidKey: 'BCoCa7q9CibTWBJh6MtEAHfh3imGWB7Iu66RfjQnN0IsRQkye1Z4cU_fbaFhZiNT6sKZIINH6a6QkG8Ow-Ulrjc'
      })
      console.log('token', token)
    } else if (permission === 'denied' || permission === 'default') {
      alert('You  denied for the notification')
      await Notification.requestPermission().then((permission) => {
        console.log('permision', permission)
      })
    }
  }

  useEffect(() => {
    requestPermission()
  }, [])

  return (
    <div>FirebaseNotify</div>
  )
}

export default FirebaseNotify
