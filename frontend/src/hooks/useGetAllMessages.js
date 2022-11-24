import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

//
import useCallApi from './useCallApi'
import { showToastError } from '../utils/toast'

export default function useGetAllMessages() {
  const { isLoading, error, sendRequest } = useCallApi()
  const receiverId = useParams().id

  const [allMessages, setAllMessages] = useState([])

  const applyApiData = (data) => {
    //  format data
    let formatData = []
    let i = 0
    let previousSender = data?.data[0]?.from

    data.data.forEach((message) => {
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

    setAllMessages(formatData)
  }

  useEffect(() => {
    if (error) {
      showToastError('Fail to fetch message! Try again later')
    }
  }, [error])

  useEffect(() => {
    sendRequest(
      {
        url: `/api/message?receiverId=${receiverId}`,
        method: 'get',
        data: {
          receiverId,
        },
      },
      applyApiData
    )
  }, [receiverId])

  return { isLoadingAll: isLoading, allMessages, receiverId, setAllMessages }
}
