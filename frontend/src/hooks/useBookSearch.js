import { useEffect, useState } from 'react'
import axios from 'axios'

const useBookSearch = (query, pageNumber) => {
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState()
  const [books, setBooks] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setisLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'get',
      url: 'http://openlibrary.org/search.json',
      params: {
        q: query,
        page: pageNumber,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((data) => {
        console.log(data.data)
        setBooks((prevBooks) => {
          return [
            ...new Set([...prevBooks, ...data.data.docs].map((b) => b?.title)),
          ]
        })
        setHasMore(data.data.docs.length > 0)
        setisLoading(false)
      })
      .catch((e) => {
        if (axios.isCancel(e)) return
        setError(true)
      })

    return () => cancel()
  }, [query, pageNumber])

  useEffect(() => {
    setBooks([])
  }, [query])

  return { isLoading, error, books, hasMore }
}

export default useBookSearch
