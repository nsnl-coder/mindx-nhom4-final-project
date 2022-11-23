import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
export const AuthContext = createContext()

const AuthContextProvider = (props) => {
  const authLocal = JSON.parse(localStorage.getItem('auth'))

  let initialAuth = authLocal

  if (!authLocal) {
    initialAuth = {
      isLoggedIn: false,
      userId: null,
      profileImage: '',
    }
  }

  const [auth, setAuth] = useState(initialAuth)

  useEffect(() => {
    if (authLocal && authLocal.token) {
      axios({
        url: '/api/auth/checkJWT',
        headers: {
          token: authLocal.token,
        },
      })
        .then((data) => {
          const { id, profileImage, username } = data.data.user
          setAuth({
            userId: id,
            isLoggedIn: true,
            profileImage,
            username,
          })
        })
        .catch((err) => {
          localStorage.removeItem('auth')
        })
    }
  }, [])
  const contextData = { auth, setAuth }

  return (
    <AuthContext.Provider value={contextData}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
