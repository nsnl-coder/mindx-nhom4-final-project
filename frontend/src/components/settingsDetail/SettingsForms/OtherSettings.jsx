import { useEffect, useState } from 'react'

import FormButtons from './FormButtons'
import useCallApi from '../../../hooks/useCallApi'
import { showToastError, showToastSuccess } from '../../../utils/toast'

const OtherSettings = ({ user, updateUser, t }) => {
  const [gender, setGender] = useState(user?.gender)
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth?.slice(0, 10))

  const { isLoading, error, sendRequest } = useCallApi()

  const applyApiData = (data) => {
    updateUser()
    setGender(data.gender)
    setDateOfBirth(data.dateOfBirth)
    showToastSuccess('Change successfully')
  }

  const handleChangeInput = (e) => {
    switch (e.target.name) {
      case 'gender':
        setGender(e.target.value)
        return
      default:
        setDateOfBirth(e.target.value)
        return
    }
  }

  const handleClearInput = () => {
    setGender(user?.gender)
    setDateOfBirth(user?.dateOfBirth?.slice(0, 10))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('gender', gender)
    formData.append('dateOfBirth', dateOfBirth)

    sendRequest(
      {
        method: 'put',
        url: `${import.meta.env.VITE_BACKEND_HOST}/api/user/updateUser/${user?._id}`,
        data: formData,
      },
      applyApiData
    )
  }

  useEffect(() => {
    if (error) {
      showToastError('Something went wrong, please try again')
    }
  }, [error])

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-8 flex flex-col mx-12 text-text text-lg font-medium">
        <h3>{t('Gender:')}</h3>
        <div className="flex justify-between font-normal">
          <label className="label cursor-pointer">
            <input
              name="gender"
              type="radio"
              value="Male"
              checked={gender === 'Male'}
              className="radio checked:bg-primary mr-2 sm:mr-4"
              onChange={handleChangeInput}
            />
            <span>{t('male')}</span>
          </label>
          <label className="label cursor-pointer">
            <input
              name="gender"
              type="radio"
              value="Female"
              checked={gender === 'Female'}
              className="radio checked:bg-primary mr-2 sm:mr-4"
              onChange={handleChangeInput}
            />
            <span>{t('female')}</span>
          </label>
          <label className="label cursor-pointer">
            <input
              name="gender"
              type="radio"
              value="Other"
              checked={gender === 'Other'}
              className="radio checked:bg-primary mr-2 sm:mr-4"
              onChange={handleChangeInput}
            />
            <span>{t('other')}</span>
          </label>
        </div>
        <label htmlFor="dateOfBirth" className="mt-16">
          {t('dob')}{':'}
        </label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={handleChangeInput}
          className="bg-white text-text font-normal outline-none border-gray-300 border-[2px] my-2 p-2 rounded-lg"
        />
        <FormButtons onClear={handleClearInput} t={t} />
      </div>
    </form>
  )
}

export default OtherSettings