import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

//
import { showToastError } from '../utils/toast'
import useErrorHandler from './useErrorHandler'
import useInfiniteFetch from './useInfiniteFetch'

export default function useGetAllMessages() {
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
  const receiverId = useParams().id

  const [allMessages, setAllMessages] = useState([])

  useErrorHandler('Failed to fetch messages! Try again later')

  const applyApiData = (res) => {
    if (!res.data.length) {
      setHasMore(false)
      return
    } else {
      setHasMore(true)
    }
    res.data = res.data.reverse()

    //  format data
    let formatData = []
    let i = 0
    let previousSender = res.data[0].from

    res.data.forEach((message) => {
      if (message.from === previousSender) {
        if (!formatData[i]) formatData[i] = []
        formatData[i].push(message)
      } else {
        i++
        if (!formatData[i]) formatData[i] = []
        formatData[i].push(message)
        previousSender = message.from
      }
    })

    if (pageNumber === 1) {
      return setAllMessages(formatData)
    }
    setAllMessages((prev) => [...formatData, ...prev])
  }

  useEffect(() => {
    setAllMessages([])
    if (pageNumber !== 1) setPageNumber(1)
  }, [receiverId])

  useEffect(() => {
    sendRequest(
      {
        url: `/api/message?receiverId=${receiverId}&page=${pageNumber}`,
        method: 'get',
      },
      applyApiData
    )
  }, [receiverId, pageNumber])

  return {
    isLoadingAll: isLoading,
    allMessages,
    receiverId,
    setAllMessages,
    hasMore,
    lastElementRef,
  }
}
