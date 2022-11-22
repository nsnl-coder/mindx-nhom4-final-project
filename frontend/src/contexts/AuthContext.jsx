import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
export const AuthContext = createContext()

const AuthContextProvider = (props) => {
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzdkNGY1ZjlmM2U1MjUxMzk2YTcwYSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjkwNzcxODUsImV4cCI6MTY3Njg1MzE4NX0.zJV-Lf0GHN98JRi8QQ_SzEosNiQm6WMpLf8yrA_KXMo'
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    userId: null,
    token: '',
  })

  // useEffect(() => {
  //   axios({
  //     url: '/api/auth/checkJWT',
  //     headers: {
  //       token,
  //     },
  //   })
  //     .then((data) => {
  //       const id = data.data.user.id
  //       setAuth({ userId: id, token, isLoggedIn: true })
  //     })
  //     .catch((err) => {
  //       // setAuth(prev=>{return {...prev,isLoggedIn}})
  //     })
  // }, [])
  const contextData = { auth, setAuth }

  return (
    <AuthContext.Provider value={contextData}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
