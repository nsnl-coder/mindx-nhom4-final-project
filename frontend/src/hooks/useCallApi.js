import { useCallback, useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthContext'

const useCallApi = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { auth } = useContext(AuthContext)
  const { token } = auth

  const sendRequest = async (requestConfig, applyApiData) => {
    setIsLoading(true)

    try {
      const { data } = await axios({
        method: requestConfig.method || 'GET',
        url: requestConfig.url,
        data: requestConfig.data,
        headers: {
          token,
        },
        withCredentials: true,
      })
      applyApiData(data)
    } catch (err) {
      setError(err)
    }
    setIsLoading(false)
  }

  return { isLoading, error, sendRequest }
}

export default useCallApi
