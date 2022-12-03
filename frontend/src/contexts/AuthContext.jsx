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
      token: '',
    }
  }

  const [auth, setAuth] = useState(initialAuth)

  useEffect(() => {
    axios({
      url: '/api/auth/checkJWT',
      method: 'post',
      headers: {
        token: authLocal?.token,
      },
      withCredentials: true,
    })
      .then((data) => {
        const { _id, profileImage, username, token } = data.data.user
        setAuth({
          userId: _id,
          isLoggedIn: true,
          profileImage,
          username,
          token: authLocal?.token || token,
        })
      })
      .catch((err) => {
        localStorage.removeItem('auth')
      })
  }, [])
  const contextData = { auth, setAuth }

  return (
    <AuthContext.Provider value={contextData}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
