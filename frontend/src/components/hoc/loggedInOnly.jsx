import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { showToastError } from '../../utils/toast'

const loggedInOnly = (Component) => {
  const NewComponent = () => {
    const navigate = useNavigate()
    const { auth } = useContext(AuthContext)
    const { isLoggedIn } = auth

    useEffect(() => {
      if (!isLoggedIn) {
        showToastError('You need to login first to add new post')
        navigate('/auth/login')
      }
    }, [isLoggedIn])

    return <Component />
  }
  return NewComponent
}

export default loggedInOnly
