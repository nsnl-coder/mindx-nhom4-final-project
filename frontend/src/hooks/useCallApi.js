import { useCallback, useState } from 'react'
import axios from 'axios'

const useCallApi = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendRequest = async (requestConfig, applyApiData) => {
    setIsLoading(true)

    try {
      const { data } = await axios({
        method: requestConfig.method || 'GET',
        url: requestConfig.url,
        data: requestConfig.data,
      })
      applyApiData(data)
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
  }

  return { isLoading, error, sendRequest }
}

export default useCallApi
