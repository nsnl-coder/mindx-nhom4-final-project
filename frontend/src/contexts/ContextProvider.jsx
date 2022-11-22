import AuthContextProvider from './AuthContext'

const ContextProvider = (props) => {
  return <AuthContextProvider>{props.children}</AuthContextProvider>
}

export default ContextProvider
