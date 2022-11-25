import { createContext, useContext, useRef, useState } from 'react'
import socketIO from 'socket.io-client'
import { useEffect } from 'react'

//
import { AuthContext } from './AuthContext'
const SocketContext = createContext()

const SocketContextProvider = (props) => {
  const { auth } = useContext(AuthContext)
  const [socket, setSocket] = useState()
  const [onlineUserIds, setOnlineUserIds] = useState()
  const [onlineUserProfiles, setOnlineUserProfiles] = useState()

  // typing state manager
  const [typingUserId, setTypingUserId] = useState()
  const lastTimeTypingRef = useRef()
  const lastReceiverRef = useRef()
  const typingTimeoutRef = useRef()

  const [receiveMessage, setReceiveMessage] = useState()

  // emit log out event
  useEffect(() => {
    if (auth.isLoggedIn) {
      const newSocket = socketIO.connect(import.meta.env.VITE_BACKEND_HOST)
      setSocket(newSocket)
    } else {
      socket?.emit('logout')
      setSocket(null)
    }
  }, [auth.isLoggedIn])

  if (socket) {
    socket.on('connect', onUserConnect)
    socket.on('new_user_online', onNewUserOnline)
    socket.on('typing_message', onReceiveTypingEvent)
    socket.on('new_message', onReceiveNewMessage)
  }

  // SOCKET LISTENER
  function onUserConnect() {
    socket.emit('new_connection', {
      userId: auth.userId,
      profileImage: auth.profileImage,
      username: auth.username,
    })
  }

  function onNewUserOnline(onlineUserInfo) {
    setOnlineUserIds(onlineUserInfo.onlineUserIds)
    setOnlineUserProfiles(onlineUserInfo.onlineUserProfiles)
  }

  function onReceiveTypingEvent(id) {
    setTypingUserId(id)

    if (id === lastReceiverRef.current) clearTimeout(typingTimeoutRef.current)

    lastReceiverRef.current = id
    typingTimeoutRef.current = setTimeout(() => {
      setTypingUserId('')
    }, 2000)
  }

  function onReceiveNewMessage(receiveMessage) {
    setReceiveMessage(receiveMessage)
  }

  //  EMIT EVENT
  function emitTypingEvent(receiverId) {
    // not emit event if emitted in past 1.3s
    if (
      Date.now() - lastTimeTypingRef.current < 1300 &&
      lastReceiverRef.current === receiverId
    )
      return

    socket.emit('typing_message', receiverId)
    lastTimeTypingRef.current = Date.now()
    lastReceiverRef.current = receiverId
  }

  function emitNewMessage(newMessage) {
    socket.emit('new_message', newMessage)
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUserIds,
        onlineUserProfiles,
        emitTypingEvent,
        setTypingUserId,
        typingUserId,
        emitNewMessage,
        receiveMessage,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider
export { SocketContext }
