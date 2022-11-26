import { useEffect, useRef, useState } from 'react'
import useCallApi from './useCallApi'
import { showToastError } from '../utils/toast'

const useSearchUsers = (keyword) => {
  const { isLoading, error, sendRequest } = useCallApi()
  const [users, setUsers] = useState([])

  const applyApiData = (data) => {
    setUsers(data.data)
  }

  const timeoutRef = useRef()

  useEffect(() => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      sendRequest(
        { url: `/api/user/search-users?keyword=${keyword}` },
        applyApiData
      )
    }, 1000)
  }, [keyword])

  useEffect(() => {
    if (error) {
      showToastError('Something wentwrong! Try again later!')
    }
  }, [error])

  return { isLoading, users }
}

export default useSearchUsers
