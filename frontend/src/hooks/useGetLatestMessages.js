import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts'
import { showToastError } from '../utils/toast'
import useCallApi from './useCallApi'

export default function useGetLatestMessages() {
  const { isLoading, error, sendRequest } = useCallApi()
  const [latestMessages, setLatestMessages] = useState([])
  const { auth } = useContext(AuthContext)

  const applyApiData = (data) => {
    setLatestMessages(data.data)
  }

  useEffect(() => {
    if (auth.isLoggedIn) {
      sendRequest({ url: '/api/message/latest', method: 'get' }, applyApiData)
    }
  }, [auth.isLoggedIn])

  useEffect(() => {
    if (error) {
      showToastError('Failed to load messages, please try again later!')
    }
  }, [error])

  return { latestMessages, isLoading, setLatestMessages }
}
