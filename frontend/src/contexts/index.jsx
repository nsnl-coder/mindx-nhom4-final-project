import AuthContextProvider from './AuthContext'
import SocketContextProvider from './SocketContext'

const ContextProvider = (props) => {
  return (
    <AuthContextProvider>
      <SocketContextProvider>{props.children}</SocketContextProvider>
    </AuthContextProvider>
  )
}

export default ContextProvider
export { SocketContext } from './SocketContext'
export { AuthContext } from './AuthContext.jsx'
