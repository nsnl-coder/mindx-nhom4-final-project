import AuthContextProvider from './AuthContext'
import MessageContextProvider from './MessageContext'
import SocketContextProvider from './SocketContext'

const ContextProvider = (props) => {
  return (
    <AuthContextProvider>
      <SocketContextProvider>
        <MessageContextProvider>{props.children}</MessageContextProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  )
}

export default ContextProvider
export { SocketContext } from './SocketContext'
export { AuthContext } from './AuthContext'
export { MessageContext } from './MessageContext'
