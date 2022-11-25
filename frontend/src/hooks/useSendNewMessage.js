import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

//
import { showToastError } from '../utils/toast'
import useCallApi from './useCallApi'

export default function useSendNewMessage() {
  const { isLoading, error, sendRequest } = useCallApi()
  const [newMessage, setNewMessage] = useState()
  const receiverId = useParams().id

  useEffect(() => {
    if (error) {
      showToastError('Cannot send message at the moment! Try again later.')
      console.log(error)
    }
  }, [error])

  const applyApiData = (data) => {
    setNewMessage(data.data)
  }

  const sendMessage = (content) => {
    sendRequest(
      {
        url: '/api/message',
        method: 'post',
        data: {
          to: receiverId,
          content,
        },
      },
      applyApiData
    )
  }

  return { isSending: isLoading, newMessage, sendMessage, setNewMessage }
}
