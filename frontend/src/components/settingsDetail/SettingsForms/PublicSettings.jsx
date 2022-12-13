import { useEffect, useState } from 'react'
import { ref, getDownloadURL, uploadBytes } from '@firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import FormButtons from './FormButtons'
import useCallApi from '../../../hooks/useCallApi'
import { showToastError, showToastSuccess } from '../../../utils/toast'
import { storage } from '../../../../firebase'

const PublicSettings = ({ user, updateUser, t }) => {
  const [image, setImage] = useState(user?.profileImage)
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const [username, setUsername] = useState(user?.username)
  const [loading, setLoading] = useState(false)
  const { isLoading, error, sendRequest } = useCallApi()

  const applyApiData = (data) => {
    updateUser()
    showToastSuccess('Change successfully')
    setImage(data.profileImage)
    setFirstName(data.firstName)
    setLastName(data.lastName)
    setUsername(data.username)
    setLoading(false)
  }

  const handleChangeImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0])
    }
  }

  const handleChangeInput = (e) => {
    switch (e.target.id) {
      case 'firstName':
        setFirstName(e.target.value)
        return
      case 'lastName':
        setLastName(e.target.value)
        return
      default:
        setUsername(e.target.value)
        return
    }
  }

  const handleClearInput = () => {
    setImage(user?.profileImage)
    setFirstName(user?.firstName)
    setLastName(user?.lastName)
    setUsername(user?.username)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const avatar = e.target[0].files[0]

    const formData = new FormData()
    const idImage = uuidv4()
    setLoading(true)
    if (avatar) {
      const mountainsRef = ref(storage, `avatar/image-${idImage}`)
      await uploadBytes(mountainsRef, image)
      await getDownloadURL(mountainsRef).then((url) => {
        formData.append('profileImage', url)
      })
    }

    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('username', username)

    sendRequest(
      {
        method: 'put',
        url: `${import.meta.env.VITE_BACKEND_HOST}/api/user/updateUser/${
          user?._id
        }`,
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
      <div className="flex flex-col justify-center items-center">
        <img
          src={
            image !== user?.profileImage ? URL.createObjectURL(image) : image
          }
          className="w-32 h-32 rounded-full"
          alt="user-avatar"
        />
        <label
          htmlFor="profileImage"
          className="cursor-pointer text-center w-[100px] m-4 px-4 py-1 bg-gray-300 rounded-full text-text hover:shadow-md"
        >
          {t('change')}
        </label>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          className="hidden"
          accept="image/*"
          onChange={handleChangeImage}
        />
      </div>
      <div className="flex flex-col mx-12 text-text text-lg font-medium">
        <label htmlFor="firstName">{t('first-name')}</label>
        <input
          required
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={handleChangeInput}
          className="bg-white text-text font-normal outline-none border-gray-300 border-[2px] my-2 p-2 rounded-lg"
        />
        <label htmlFor="lastName">{t('last-name')}</label>
        <input
          required
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={handleChangeInput}
          className="bg-white text-text font-normal outline-none border-gray-300 border-[2px] my-2 p-2 rounded-lg"
        />
        <label htmlFor="username">{t('username')}</label>
        <input
          required
          id="userName"
          name="userName"
          value={username}
          onChange={handleChangeInput}
          className="bg-white text-text font-normal outline-none border-gray-300 border-[2px] my-2 p-2 rounded-lg"
        />
        <FormButtons onClear={handleClearInput} loading={loading} t={t} />
      </div>
    </form>
  )
}

export default PublicSettings
