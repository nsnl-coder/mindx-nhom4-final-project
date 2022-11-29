import { useEffect } from 'react'
import { showToastError } from '../utils/toast'

const useErrorHandler = (message, error) => {
  useEffect(() => {
    if (error) {
      showToastError(message)
    }
  }, [error])
}

export default useErrorHandler
