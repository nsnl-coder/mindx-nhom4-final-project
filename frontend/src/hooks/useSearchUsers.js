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
  const [request, setRequest] = useState(false)
  const applyApiData = (data) => {
    if (data?.data.length === 0) {
      if (users.length === 0) setNoResultFound(true)
      setHasMore(false)
      return
    } else {
      setUsers((prev) => [...prev, ...data.data])
    }
  }
  const applyApiData2 = (data) => {
    if (data.length == 0) setNoResultFound(true)
    else {
      setUsers(data.data)
      setRequest(true)
    }
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
    }, 1500)
  }, [keyword, pageNumber])

  useEffect(() => {
    setNoResultFound(false)
    setHasMore(true)
    setRequest(false)
    sendRequest(
      {
        url: `/api/user/search-users?keyword=${keyword}&page=1`,
      },
      applyApiData2
    )
    setUsers([])
  }, [keyword])

  useEffect(() => {
    if (error) {
      showToastError('Something wentwrong! Try again later!')
    }
  }, [error])

  return { isLoading, users, lastElementRef, noResultFound }
}

export default useSearchUsers
