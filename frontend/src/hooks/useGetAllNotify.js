import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts'
import useErrorHandler from './useErrorHandler'
import useInfiniteFetch from './useInfiniteFetch'

const useGetAllNotify = () => {
  const { auth } = useContext(AuthContext)
  const {
    isLoading,
    hasMore,
    sendRequest,
    error,
    setHasMore,
    lastElementRef,
    pageNumber,
    setPageNumber,
  } = useInfiniteFetch()

  const [messageNotify, setMessageNotify] = useState([])
  const [otherNotify, setOtherNotify] = useState([])

  // handle failure
  useErrorHandler('Fail to get notifications! Try again at other time!', error)

  const applyApiData = (res) => {
    const data = res.data
    if (data.length === 0) {
      setHasMore(false)
      return
    }

    const newMessageNotify = []
    const newOtherNotify = []

    data.forEach((noti) => {
      if (noti.notifyType === 'new-message') {
        newMessageNotify.push(noti)
      } else {
        newOtherNotify.push(noti)
      }
    })

    setMessageNotify((prev) => [...prev, ...newMessageNotify])
    setOtherNotify((prev) => [...prev, ...newOtherNotify])
  }

  useEffect(() => {
    if (!auth.isLoggedIn) return

    sendRequest({ url: '/api/notify', method: 'get' }, applyApiData)
  }, [auth.isLoggedIn])

  return {
    isLoading,
    hasMore,
    messageNotify,
    setMessageNotify,
    otherNotify,
    setOtherNotify,
  }
}

export default useGetAllNotify
