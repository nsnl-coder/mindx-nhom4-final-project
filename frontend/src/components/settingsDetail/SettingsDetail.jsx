import { useState, useEffect } from 'react'

import { PublicSettings, OtherSettings, PrivateSettings } from './SettingsForms'

const SettingsDetail = ({ setting }) => {
  const [submitValue, setSubmitValue] = useState({})

  useEffect(() => {
    console.log(submitValue)
  }, [submitValue])

  const Details = ({ setValue }) => {
    switch (setting) {
      case 'other':
        return (
          <OtherSettings setValue={setValue} />
        )
      case 'private':
        return (
          <PrivateSettings setValue={setValue} />
        )
      default:
        return (
          <PublicSettings setValue={setValue} />
        )
    }
  }

  return (
    <div className="mt-4 ml-4 md:absolute md:top-4 md:right-4 md:left-[250px] max-w-[700px] md:mx-auto">
      <Details setValue={setSubmitValue} />
    </div>
  )
}

export default SettingsDetail