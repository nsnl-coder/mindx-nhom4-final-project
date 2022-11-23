import { useState, useEffect } from 'react'
import { useContext } from 'react'

import useCallApi from '../../hooks/useCallApi'
import { AuthContext } from '../../contexts/AuthContext'
import { PublicSettings, OtherSettings, PrivateSettings } from './SettingsForms'

const SettingsDetail = ({ setting }) => {
  const [user, setUser] = useState({})

  const { auth } = useContext(AuthContext)

  const { isLoading, error, sendRequest } = useCallApi()

  const useApiData = (data) => {
    setUser(data)
  }

  const updateUser = () => {
    sendRequest(
      {
        url: `${import.meta.env.VITE_BACKEND_HOST}/api/user/strangerUser/${auth?.userId}`,
        method: 'get',
      },
      useApiData
    )
  }

  useEffect(() => {
    updateUser()
  }, [])

  const Details = ({ user, updateUser }) => {
    switch (setting) {
      case 'other':
        return (
          <OtherSettings user={user} updateUser={updateUser} />
        )
      case 'private':
        return (
          <PrivateSettings user={user} updateUser={updateUser} />
        )
      default:
        return (
          <PublicSettings user={user} updateUser={updateUser} />
        )
    }
  }

  return (
    <div className="mt-4 ml-4 md:absolute md:top-4 md:right-4 md:left-[250px] max-w-[700px] md:mx-auto">
      <Details user={user} updateUser={updateUser} />
    </div>
  )
}

export default SettingsDetail