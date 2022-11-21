import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { wrapperWithHeader } from '../../components'
import SettingsDetail from '../../components/settingsDetail/SettingsDetail'
import SettingsNavigator from '../../components/settingsDetail/SettingsNavigator'

const UserSettings = () => {
  const [setting, setSetting] = useState('public')

  const { id: userId } = useParams()

  return (
    <div className="bg-white min-h-screen flex flex-col relative">
      <SettingsNavigator setting={setting} setSetting={setSetting} />
      <SettingsDetail setting={setting} />
    </div>
  )
}

export default wrapperWithHeader(UserSettings)