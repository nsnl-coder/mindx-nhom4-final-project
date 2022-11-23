import { useRef, useState, useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoIosSend } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'

//
import { LoadingSpinner } from '../../../components'
import useGetAllMessages from '../../../hooks/useGetAllMessages'
import useSendNewMessage from '../../../hooks/useSendNewMessage'
import MyMessageBlock from './MyMessageBlock'
import OtherMessageBlock from './OtherMessageBlock'

const DirectMessage = () => {
  const navigate = useNavigate()
  const [newMessageInput, setNewMessageInput] = useState('')
  const { isSending, newMessage, sendMessage, setNewMessage } =
    useSendNewMessage()
  const { isLoadingAll, allMessages, setAllMessages, receiverId } =
    useGetAllMessages()

  const boardBottomRef = useRef()

  const receiver = useLocation().state?.receiver

  useEffect(() => {
    if (!receiver) {
      navigate('/chat')
    }
  }, [])

  //  scroll to bottom
  useEffect(() => {
    console.log(allMessages)
    boardBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [allMessages])

  // update ui after sending the message
  useEffect(() => {
    if (newMessage) {
      const blockLength = allMessages.length
      const lastBlock = allMessages[blockLength - 1]
      console.log(lastBlock)
      const newAllMessage = [...allMessages]

      if (newMessage.from === lastBlock[0].from) {
        newAllMessage[blockLength - 1].push(newMessage)
      } else {
        console.log('❤️❤️❤️❤️❤️')
        newAllMessage[blockLength] = []
        newAllMessage[blockLength].push(newMessage)
      }
      setNewMessage(null)
      setAllMessages(newAllMessage)
    }
  }, [newMessage])

  const sendMessageHandler = (e) => {
    e.preventDefault()
    sendMessage(newMessageInput)
    setNewMessageInput('')
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between bg-white items-center px-4 shadow-md">
        <BsThreeDotsVertical />
      </div>
      <div className="flex flex-col px-10 space-y-8 flex-grow overflow-y-auto py-4 hide-scrollbar">
        {!isLoadingAll &&
          allMessages?.map((block) => {
            if (block[0].from === receiverId) {
              return (
                <OtherMessageBlock
                  receiver={receiver}
                  key={block[0]._id}
                  messages={block}
                />
              )
            }
            return <MyMessageBlock key={block[0]._id} messages={block} />
          })}
        {isLoadingAll && (
          <div className="flex mt-auto justify-end">
            <LoadingSpinner />
          </div>
        )}

        {isSending && (
          <div className="flex justify-end px-8 !mt-4">
            <p className="text-sm">Sending...</p>
          </div>
        )}
        <div ref={boardBottomRef}></div>
      </div>
      <div className="w-full px-10 mb-8">
        <form onSubmit={sendMessageHandler} className="relative">
          <input
            type="text"
            className="w-full py-4 rounded-md outline-none px-6 placeholder:text-sm"
            placeholder="Type something..."
            onChange={(e) => setNewMessageInput(e.target.value)}
            value={newMessageInput}
          />
          <button
            className={
              newMessageInput.trim() !== ''
                ? 'absolute right-4 top-1/2 -translate-y-1/2 text-3xl text-blue-message'
                : 'absolute right-4 top-1/2 -translate-y-1/2 text-3xl text-blue-message/50 cursor-none pointer-events-none'
            }
          >
            <IoIosSend />
          </button>
        </form>
      </div>
    </div>
  )
}

export default DirectMessage
