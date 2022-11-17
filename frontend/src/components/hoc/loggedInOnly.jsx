import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const loggedInOnly = (Component) => {
  const isLoggedIn = true

  const NewComponent = () => {
    const navigate = useNavigate()
    useEffect(() => {
      if (!isLoggedIn) {
        navigate('/auth/login')
      }
    }, [])

    return <Component />
  }
  return NewComponent
}

export default loggedInOnly
