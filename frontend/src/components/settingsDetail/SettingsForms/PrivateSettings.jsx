import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import FormButtons from './FormButtons'
import useCallApi from '../../../hooks/useCallApi'
import { showToastError, showToastSuccess } from '../../../utils/toast'
import useLogUserOut from '../../../hooks/useLogUserOut'

// const regex = //

const PrivateSettings = ({ user, updateUser, t }) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPassword2, setNewPassword2] = useState('')

  const { logOut } = useLogUserOut()

  const navigate = useNavigate()

  const { isLoading, error, sendRequest } = useCallApi()

  const handleClearInput = () => {
    setOldPassword('')
    setNewPassword('')
    setNewPassword2('')
  }

  const useApiData = (data) => {
    showToastSuccess('Delete account successfully')
    logOut()
  }

  const applyApiData = (data) => {
    if (data) showToastSuccess('Password changed successfully')
    updateUser()
    handleChangeInput()
  }

  const handleChangeInput = (e) => {
    switch (e.target.id) {
      case 'oldPassword':
        setOldPassword(e.target.value)
        return
      case 'newPassword':
        setNewPassword(e.target.value)
        return
      default:
        setNewPassword2(e.target.value)
        return
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (newPassword !== newPassword2) {
      showToastError('Password mismatch')
      return
    }

    if (newPassword.length < 8 || newPassword2.length < 8) {
      showToastError('Password must have the length of 8 or more')
      return
    }

    sendRequest(
      {
        method: 'put',
        url: `/api/user/change-password/${user?._id}`,
        data: {
          oldPassword: oldPassword,
          newPassword: newPassword
        },
      },
      applyApiData
    )
  }

  const handleDeleteAccount = () => {
    sendRequest(
      {
        method: 'delete',
        url: `/api/user/delete/${user?._id}`,
      },
      useApiData
    )
  }

  useEffect(() => {
    if (error) {
      showToastError('Something went wrong, please try again')
    }
  }, [error])

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col mx-12 text-text text-lg font-medium">
        <label htmlFor="oldPassword">
          {t('old-password')}
        </label>
        <input
          required
          type="password"
          id="oldPassword"
          name="oldPassword"
          value={oldPassword}
          // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          onChange={handleChangeInput}
          className="bg-white text-text font-normal outline-none border-gray-300 border-[2px] my-2 p-2 rounded-lg"
        />
        <label htmlFor="newPassword">
          {t('new-password')}
        </label>
        <input
          required
          type="password"
          id="newPassword"
          name="newPassword"
          // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          value={newPassword}
          onChange={handleChangeInput}
          className="bg-white text-text font-normal outline-none border-gray-300 border-[2px] my-2 p-2 rounded-lg"
        />
        <label htmlFor="newPassword2">
          {t('confirm-password')}
        </label>
        <input
          required
          type="password"
          id="newPassword2"
          name="newPassword2"
          // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          value={newPassword2}
          onChange={handleChangeInput}
          className="bg-white text-text font-normal outline-none border-gray-300 border-[2px] my-2 p-2 rounded-lg"
        />
        <label
          htmlFor="delete-modal"
          className="text-center cursor-pointer w-[200px] mx-auto md:mx-0 uppercase my-4 px-4 py-2 bg-gray-300 rounded-full text-text font-medium hover:shadow-lg"
        >
          {t('delete-account')}
        </label>
        <input type="checkbox" id="delete-modal" className="modal-toggle" />
        <label htmlFor="delete-modal" className="modal cursor-pointer">
          <label className="py-8 modal-box relative" htmlFor="">
            <h3 className="text-lg font-bold text-center">
              {t('Are you sure want to delete your account?')}
            </h3>
            <div className="mt-4 flex justify-center gap-8">
              <label
                htmlFor="delete-modal"
                className="text-center text-base cursor-pointer w-[100px] mx-auto md:mx-0 uppercase my-4 px-4 py-2 bg-primary rounded-full text-white font-medium hover:shadow-lg"
                onClick={handleDeleteAccount}
              >
                {t('yes')}
              </label>
              <label
                htmlFor="delete-modal"
                className="text-center text-base cursor-pointer w-[100px] mx-auto md:mx-0 uppercase my-4 px-4 py-2 bg-gray-300 rounded-full text-text font-medium hover:shadow-lg"
              >
                {t('no')}
              </label></div>
          </label>
        </label>
        <FormButtons onClear={handleClearInput} t={t} />
      </div>
    </form >
  )
}

export default PrivateSettings