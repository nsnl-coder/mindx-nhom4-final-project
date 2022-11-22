import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { showToastError } from '../utils/toast'
import useCallApi from './useCallApi'

export default function useGetPostDetail() {
  const { isLoading, error, sendRequest } = useCallApi()
  const [post, setPost] = useState()
  const id = useParams().id

  const applyApiData = (data) => {
    console.log(data)
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
  }, [])

  useEffect(() => {
    if (error) {
      showToastError('Something went wrong! Please try again later')
    }
  }, [error])

  return { isLoading, error, post }
}
