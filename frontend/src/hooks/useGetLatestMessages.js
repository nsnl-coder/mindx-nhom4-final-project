import { useEffect, useState } from 'react'
import { showToastError } from '../utils/toast'
import useCallApi from './useCallApi'

export default function useGetLatestMessages() {
  const { isLoading, error, sendRequest } = useCallApi()
  const [latestMessages, setLatestMessages] = useState()

  const applyApiData = (data) => {
    setLatestMessages(data.data)
  }

  useEffect(() => {
    sendRequest({ url: '/api/message/latest', method: 'get' }, applyApiData)
  }, [])

  useEffect(() => {
    if (error) {
      showToastError('Failed to load messages, please try again later!')
    }
  }, [error])

  return { latestMessages, isLoading }
}
