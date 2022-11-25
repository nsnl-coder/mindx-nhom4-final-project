import { useEffect } from 'react'
import useInfiniteFetch from './useInfiniteFetch'

const useTestInfinite = (receiverId) => {
  const {
    isLoading,
    hasMore,
    data,
    sendRequest,
    error,
    setHasMore,
    setData,
    lastElementRef,
    pageNumber,
  } = useInfiniteFetch()

  const applyApiData = (res) => {
    if (!res.data.length) {
      setHasMore(false)
      return
    }

    // setData((prev) => [...prev, ...res.data])
    setData((prevBooks) => {
      return [
        ...new Set([...prevBooks, ...data.data.docs].map((b) => b?.title)),
      ]
    })
  }

  useEffect(() => {
    sendRequest(
      {
        url: '/api/message',
        method: 'get',
        params: {
          page: pageNumber,
          receiverId: receiverId,
        },
      },
      applyApiData
    )
  }, [pageNumber, query])

  useEffect(() => {
    if (error) {
      console.log(error)
    }
  }, [error])

  return { isLoading, error, data, hasMore, lastElementRef }
}

export default useTestInfinite
