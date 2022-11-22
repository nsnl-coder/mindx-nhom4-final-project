import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
export const AuthContext = createContext()

const AuthContextProvider = (props) => {
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzdkNGY1ZjlmM2U1MjUxMzk2YTcwYSIsImlzQWRtaW4iOmZhbHNlLCJwcm9maWxlSW1hZ2UiOiJodHRwczovL2R2ZG4yNDcubmV0L3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDIwLzA3L2F2YXRhci1tYWMtZGluaC0xLnBuZyIsInVzZXJuYW1lIjoibnNubEBtYWlsc2FjLmNvbSIsImlhdCI6MTY2OTA4NzA3NCwiZXhwIjoxNjc2ODYzMDc0fQ.uNt0LhLXsV6KCTOUTbUYMfUyE2L0fHigeEheTJLPMP0'
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    userId: null,
    token: '',
    profileImage: '',
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
