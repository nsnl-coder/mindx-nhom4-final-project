import { createContext, useContext, useEffect, useRef, useState } from 'react'
import useGetLatestMessages from '../hooks/useGetLatestMessages'
import { AuthContext } from './AuthContext'
import { SocketContext } from './SocketContext'

const MessageContext = createContext()

const MessageContextProvider = (props) => {
  //
  const [typingId, setTypingId] = useState('')
  const [isNotification, setIsNotification] = useState(false)

  // latest message
  const { isLoading, latestMessages, setLatestMessages } =
    useGetLatestMessages()
  const { socket } = useContext(SocketContext)
  const { auth } = useContext(AuthContext)

  const typingTimeOutRef = useRef()
  const oldMessageRef = useRef()

  const newMessageHandler = (message) => {
    handleNewLatestMessage(message)
  }

  useEffect(() => {
    if (latestMessages.length) {
      for (let i = 0; i < latestMessages.length; i++) {
        if (
          !latestMessages[i].isRead &&
          latestMessages[i].from._id !== auth.userId
        ) {
          return setIsNotification(true)
        }
      }
      setIsNotification(false)
    }
  }, [latestMessages])

  useEffect(() => {
    if (socket) {
      socket.on('typing_message', (id) => {
        setTypingId(id)
      })
      socket.on('new_message', newMessageHandler)
    }
  }, [socket])

  useEffect(() => {
    if (typingId) {
      handleTypingMessage(typingId)
      setTypingId('')
    }
  }, [typingId])

  const handleTypingMessage = (id) => {
    const index = latestMessages.findIndex(
      (message) => message.from._id === id || message.to._id === id
    )

    if (index === -1) return
    const copyArr = JSON.parse(JSON.stringify(latestMessages))

    if (!oldMessageRef.current)
      oldMessageRef.current = latestMessages[index].content
    copyArr[index].content = 'typing...'

    setLatestMessages(JSON.parse(JSON.stringify(copyArr)))

    clearTimeout(typingTimeOutRef.current)
    typingTimeOutRef.current = setTimeout(() => {
      copyArr[index].content = oldMessageRef.current
      oldMessageRef.current = null
      setLatestMessages(JSON.parse(JSON.stringify(copyArr)))
    }, 2000)
  }

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
    } else {
      coppyArr.unshift(newMessage)
    }

    setLatestMessages(coppyArr)
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
        isNotification,
        setIsNotification,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  )
}

export { MessageContext }
export default MessageContextProvider
