import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { showToastError } from '../../utils/toast'

const notLoggedInOnly = (Component) => {
  const NewComponent = () => {
    const navigate = useNavigate()
    const { auth } = useContext(AuthContext)
    const { isLoggedIn, userId } = auth

    // navigate if already login
    useEffect(() => {
      if (isLoggedIn) {
        navigate(`/profile/${userId}`)
      }
    }, [isLoggedIn])

    return <Component />
  }
  return NewComponent
}

export default notLoggedInOnly
