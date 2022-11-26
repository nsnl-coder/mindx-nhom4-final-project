import { useEffect, useRef, useState } from 'react'
import useInfiniteFetch from './useInfiniteFetch'
import { showToastError } from '../utils/toast'

const useSearchUsers = (keyword) => {
  const {
    isLoading,
    error,
    sendRequest,
    lastElementRef,
    setHasMore,
    setPageNumber,
    pageNumber,
  } = useInfiniteFetch()
  const [users, setUsers] = useState([])
  const [noResultFound, setNoResultFound] = useState(false)

  const applyApiData = (data) => {
    if (data.data.length === 0) {
      if (users.length === 0) setNoResultFound(true)

      setHasMore(false)
      return
    }
    setUsers((prev) => [...prev, ...data.data])
  }

  const timeoutRef = useRef()

  useEffect(() => {
    // reset pagination

    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      sendRequest(
        { url: `/api/user/search-users?keyword=${keyword}&page=${pageNumber}` },
        applyApiData
      )
    }, 1000)
  }, [keyword, pageNumber])

  useEffect(() => {
    setPageNumber(1)
    setHasMore(true)
    setUsers([])
  }, [keyword])

  console.log(users)

  useEffect(() => {
    if (error) {
      showToastError('Something wentwrong! Try again later!')
    }
  }, [error])

  return { isLoading, users, lastElementRef, noResultFound }
}

export default useSearchUsers
