import { useEffect, useRef, useState } from 'react'
import useCallApi from './useCallApi'

const useInfiniteFetch = () => {
  const { isLoading, error, sendRequest } = useCallApi()
  const [hasMore, setHasMore] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)

  const lastElementRef = useRef()

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0]
      if (first.isIntersecting && hasMore) {
        setPageNumber((prev) => prev + 1)
      }
    })
  )

  useEffect(() => {
    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current)
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
