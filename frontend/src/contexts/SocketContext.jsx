import { createContext, useContext, useState } from 'react'
import socketIO from 'socket.io-client'
import { useEffect } from 'react'

//
import { AuthContext } from './AuthContext'
const SocketContext = createContext()

const SocketContextProvider = (props) => {
  const { auth } = useContext(AuthContext)
  const [socket, setSocket] = useState()

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
        socket.emit('new_connection', auth.userId)
      })
    }
  }, [socket])

  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider
export { SocketContext }
