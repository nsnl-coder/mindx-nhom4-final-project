import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SocketContext } from '../contexts'

//
import useCallApi from '../hooks/useCallApi'
import { showToastError } from '../utils/toast'

export default function useAddNewComment() {
  const { isLoading, error, sendRequest } = useCallApi()
  const id = useParams().id
  const [newComments, setNewComments] = useState([])
  const { emitCommentEvent } = useContext(SocketContext)

  const applyApiData = (data) => {
    setNewComments((prev) => [data, ...prev])
    emitCommentEvent(data)
  }

  const addNewCommentRequest = (content) => {
    sendRequest(
      {
        url: `/api/comment/${id}`,
        data: { content },
        method: 'post',
      },
      applyApiData
    )
  }

  useEffect(() => {
    if (error) {
      console.log(error)
      showToastError('Something went wrong! Please try again later')
    }
  }, [error])

  return { addNewCommentRequest, isLoading, newComments }
}
