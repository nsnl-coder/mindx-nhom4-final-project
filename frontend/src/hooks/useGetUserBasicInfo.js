import { useEffect, useState } from 'react'
import { showToastError } from '../utils/toast'
import useCallApi from './useCallApi'

export default function useGetUserBaiscInfo(receiverId) {
  const { isLoading, error, sendRequest } = useCallApi()
  const [userBasicInfo, setUserBasicInfo] = useState()

  const applyApiData = (data) => {
    setUserBasicInfo(data.data)
  }

  useEffect(() => {
    sendRequest(
      { url: `/api/user/basic-info/${receiverId}`, method: 'get' },
      applyApiData
    )
  }, [receiverId])

  useEffect(() => {
    if (error) {
      showToastError('Failed to load receiver Info! Try again later!')
    }
  }, [error])

  return { userBasicInfo, isLoadingBasicInfo: isLoading }
}
