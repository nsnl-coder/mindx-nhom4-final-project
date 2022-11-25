import { createContext, useContext, useState } from 'react'
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

  useEffect(() => {
    if (auth.isLoggedIn) {
      const newSocket = socketIO.connect(import.meta.env.VITE_BACKEND_HOST)
      setSocket(newSocket)
    } else {
      socket?.emit('logout')
      setSocket(null)
    }
  }, [auth.isLoggedIn])

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        socket.emit('new_connection', {
          userId: auth.userId,
          profileImage: auth.profileImage,
          username: auth.username,
        })
      })
      socket.on('new_user_online', (onlineUserInfo) => {
        setOnlineUserIds(onlineUserInfo.onlineUserIds)
        setOnlineUserProfiles(onlineUserInfo.onlineUserProfiles)
      })
    }
  }, [socket])

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUserIds,
        onlineUserProfiles,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider
export { SocketContext }
