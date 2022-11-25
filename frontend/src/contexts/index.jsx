import AuthContextProvider from './AuthContext'
import MessageContextProvider from './MessageContext'
import NotificationContextProvider from './NotifyContext'
import SocketContextProvider from './SocketContext'

const ContextProvider = (props) => {
  return (
    <AuthContextProvider>
      <NotificationContextProvider>
        <SocketContextProvider>
          <MessageContextProvider>{props.children}</MessageContextProvider>
        </SocketContextProvider>
      </NotificationContextProvider>
    </AuthContextProvider>
  )
}

export default ContextProvider
export { SocketContext } from './SocketContext'
export { AuthContext } from './AuthContext'
export { MessageContext } from './MessageContext'
export { NotifyContext } from './NotifyContext'
