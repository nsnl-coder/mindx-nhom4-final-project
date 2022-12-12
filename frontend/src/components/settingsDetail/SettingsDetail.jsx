import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import useCallApi from '../../hooks/useCallApi'
import { AuthContext } from '../../contexts/AuthContext'
import { PublicSettings, OtherSettings, PrivateSettings } from './SettingsForms'

const SettingsDetail = ({ setting }) => {
  const [user, setUser] = useState({})

  const { auth } = useContext(AuthContext)

  const { t } = useTranslation()

  const { isLoading, error, sendRequest } = useCallApi()

  const useApiData = (data) => {
    setUser(data)
  }

  const updateUser = () => {
    sendRequest(
      {
        url: `/api/user/find/${auth?.userId}`,
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
        return <OtherSettings user={user} updateUser={updateUser} t={t} />
      case 'private':
        return <PrivateSettings user={user} updateUser={updateUser} t={t} />
      default:
        return <PublicSettings user={user} updateUser={updateUser} t={t} />
    }
  }

  return (
    <div className="mt-4 ml-4 md:absolute md:top-4 md:right-4 md:left-[250px] max-w-[700px] md:mx-auto">
      <Details user={user} updateUser={updateUser} />
    </div>
  )
}

export default SettingsDetail
