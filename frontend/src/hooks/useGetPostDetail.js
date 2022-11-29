import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { showToastError } from '../utils/toast'
import useCallApi from './useCallApi'
import useErrorHandler from './useErrorHandler'

export default function useGetPostDetail(reload) {
  const { isLoading, error, sendRequest } = useCallApi()
  const [post, setPost] = useState()
  const id = useParams().id

  const applyApiData = (data) => {
    setPost(data)
  }

  useEffect(() => {
    sendRequest(
      {
        url: `/api/post/find/${id}`,
        method: 'get',
      },
      applyApiData
    )
  }, [reload])

  useErrorHandler('Something went wrong! Please try again later', error)

  return { isLoading, error, post }
}
