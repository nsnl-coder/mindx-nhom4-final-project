import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const notLoggedInOnly = (Component) => {
  const isLoggedIn = true

  const NewComponent = () => {
    const navigate = useNavigate()

    // navigate if already login
    useEffect(() => {
      if (isLoggedIn) {
        navigate('/profile/testprofile')
      }
    }, [])

    return <Component />
  }
  return NewComponent
}

export default notLoggedInOnly
