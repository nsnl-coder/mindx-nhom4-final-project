import { useCallback, useEffect, useRef, useState } from 'react'
import useCallApi from './useCallApi'

const useInfiniteFetch = () => {
  const { isLoading, error, sendRequest } = useCallApi()
  const [hasMore, setHasMore] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)

  const observer = useRef()
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore]
  )

  useEffect(() => {
    if (lastElementRef.current) {
      observer.observe(lastElementRef.current)
    }
  }, [])

  return {
    isLoading,
    hasMore,
    sendRequest,
    error,
    setHasMore,
    lastElementRef,
    pageNumber,
    setPageNumber,
  }
}

export default useInfiniteFetch
