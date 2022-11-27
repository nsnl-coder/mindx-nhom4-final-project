import { createContext, useContext, useEffect, useRef, useState } from 'react'
import useGetLatestMessages from '../hooks/useGetLatestMessages'

import { AuthContext, SocketContext, NotifyContext } from './index'

const MessageContext = createContext()

const MessageContextProvider = (props) => {
  // latest message
  const { isLoading, latestMessages, setLatestMessages } =
    useGetLatestMessages()

  const { receiveMessage } = useContext(SocketContext)
  const { auth } = useContext(AuthContext)
  const { setMessageNotify } = useContext(NotifyContext)

  useEffect(() => {
    if (latestMessages.length) {
      for (let i = 0; i < latestMessages.length; i++) {
        if (
          !latestMessages[i].isRead &&
          latestMessages[i].from._id !== auth.userId
        ) {
          return setMessageNotify(true)
        }
      }
      setMessageNotify(false)
    }
  }, [latestMessages])

  useEffect(() => {
    if (receiveMessage) {
      handleNewLatestMessage(receiveMessage)
    }
  }, [receiveMessage])

  const handleNewLatestMessage = (newMessage) => {
    const index = latestMessages.findIndex((message) => {
      const isExist =
        (message.from._id === newMessage.from._id &&
          message.to._id === newMessage.to._id) ||
        (message.from._id === newMessage.to._id &&
          message.to._id === newMessage.from._id)

      return isExist
    })

    const coppyArr = [...latestMessages]

    if (index !== -1) {
      coppyArr[index] = newMessage
      setLatestMessages(coppyArr)
    } else {
      setLatestMessages((prev) => [newMessage, ...prev])
    }
  }

  const seenAllMessagesHandler = (receiverId) => {
    const index = latestMessages.findIndex(
      (message) => message.from._id === receiverId
    )
    const copyArr = [...latestMessages]
    if (index != -1) {
      copyArr[index].isRead = true
      setLatestMessages(copyArr)
    }
  }

  return (
    <MessageContext.Provider
      value={{
        isLoading,
        latestMessages,
        handleNewLatestMessage,
        seenAllMessagesHandler,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  )
}

export { MessageContext }
export default MessageContextProvider
