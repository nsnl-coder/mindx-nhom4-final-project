import { createContext, useContext, useEffect, useState } from 'react'
import useGetAllNotify from '../hooks/useGetAllNotify'
import { showNotification } from '../utils/toast'
import { SocketContext } from './SocketContext'

const NotifyContext = createContext()

const NotificationContextProvider = (props) => {
  const {
    isLoading,
    otherNotify,
    messageNotify,
    hasMore,
    setMessageNotify,
    setOtherNotify,
  } = useGetAllNotify()

  const [messageNotifyCount, setMessageNotifyCount] = useState(0)
  const [otherNotifyCount, setOtherNotifyCount] = useState(0)

  useEffect(() => {
    const count = messageNotify.reduce((total, current) => {
      return current.notifyType === 'new-message'
        ? (total += current.count)
        : total
    }, 0)

    setMessageNotifyCount(count)
  }, [messageNotify])

  useEffect(() => {
    const count = otherNotify.reduce((total, current) => {
      return current.notifyType !== 'new-message'
        ? (total += current.count)
        : total
    }, 0)
    setOtherNotifyCount(count)
  }, [otherNotify])

  function reduceMessageNotifyCount(receiverId) {
    const index = messageNotify.findIndex(
      (noti) => noti.notifyFrom._id === receiverId
    )

    if (index == -1) return

    const messageNotifyCopy = [...messageNotify]
    messageNotifyCopy[index].count = 0
    setMessageNotify(messageNotifyCopy)
  }

  function increaseNotifyCount(from) {
    const messageNotifyCopy = [...messageNotify]

    const index = messageNotify.findIndex(
      (noti) => noti.notifyFrom._id === from
    )

    if (index == -1) {
      messageNotifyCopy.unshift({
        notifyFrom: { _id: from },
        type: 'new-message',
        count: 1,
      })
    } else {
      messageNotifyCopy[index].count++
    }
    setMessageNotify(messageNotifyCopy)
  }

  function showNewMessageToast(receiveMessage) {
    const noti = {
      notifyFrom: receiveMessage.from,
      notifyType: 'new-message',
      count: 0,
      content: receiveMessage.content,
    }
    if (!window.location.pathname.startsWith('/chat')) {
      showNotification(noti)
    }
  }
  function clearCommentNotifications(postId) {
    const otherNotifyCopy = [...otherNotify]
    for (let i = 0; i < otherNotifyCopy.length; i++) {
      if (otherNotifyCopy[i].postId === postId) {
        otherNotifyCopy[i].count = 0
      }
    }
    setOtherNotify(otherNotifyCopy)
  }

  return (
    <NotifyContext.Provider
      value={{
        messageNotify,
        setMessageNotify,
        otherNotify,
        setOtherNotify,
        messageNotifyCount,
        otherNotifyCount,
        reduceMessageNotifyCount,
        increaseNotifyCount,
        showNewMessageToast,
        clearCommentNotifications,
      }}
    >
      {props.children}
    </NotifyContext.Provider>
  )
}

export default NotificationContextProvider
export { NotifyContext }
