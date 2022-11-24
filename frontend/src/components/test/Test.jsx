import { useState, useRef, useCallback } from 'react'
import useBookSearch from '../../hooks/useBookSearch'

const Test = () => {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const { hasMore, isLoading, error, books } = useBookSearch(query, pageNumber)

  const observer = useRef()
  const lastBookElementRef = useCallback(
    (node) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1)
        }
      })

      if (node) {
        observer.current.observe(node)
      }
    },
    [isLoading, hasMore]
  )

  const handleSearch = (e) => {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <>
      <input
        type="text"
        className="border"
        onChange={handleSearch}
        value={query}
      />

      {books?.map((book, index) => {
        if (books.length === index + 1)
          return (
            <div ref={lastBookElementRef} key={book}>
              {book}
            </div>
          )
        return <div key={book}>{book}</div>
      })}
      <div>{isLoading && 'Loading...'}</div>
      <div>{error && 'Loading...'}</div>
    </>
  )
}

export default Test
