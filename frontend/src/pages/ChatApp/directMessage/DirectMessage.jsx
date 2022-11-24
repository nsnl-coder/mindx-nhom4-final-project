import { useRef, useState, useEffect, useContext } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoIosSend } from 'react-icons/io'
import { useParams } from 'react-router-dom'

//
import { LoadingSpinner } from '../../../components'
import { SocketContext } from '../../../contexts'
import useGetAllMessages from '../../../hooks/useGetAllMessages'
import useGetUserBaiscInfo from '../../../hooks/useGetUserBasicInfo'
import useSendNewMessage from '../../../hooks/useSendNewMessage'
import MyMessageBlock from './MyMessageBlock'
import OtherMessageBlock from './OtherMessageBlock'
import { Comment } from 'react-loader-spinner'

const DirectMessage = () => {
  const [newMessageInput, setNewMessageInput] = useState('')
  // handle send new message
  const { isSending, newMessage, sendMessage, setNewMessage } =
    useSendNewMessage()

  // fetch all the messages with current receiver
  const { isLoadingAll, allMessages, setAllMessages, receiverId } =
    useGetAllMessages()

  //load basic info of current receiver
  const { userBasicInfo, isLoadingBasicInfo } = useGetUserBaiscInfo(receiverId)

  // is current selected receiver typing
  const [isTyping, setisTyping] = useState(false)
  const lastTimeTypingRef = useRef()
  const lastReceiverRef = useRef()
  const typingTimeOutRef = useRef()

  // ref to a div at bottom of message page
  const boardBottomRef = useRef()

  const { socket } = useContext(SocketContext)

  // emit typing event
  useEffect(() => {
    if (newMessageInput.trim().length === 0) return

    if (
      Date.now() - lastTimeTypingRef.current < 1300 &&
      lastReceiverRef.current === receiverId
    )
      return

    socket.emit('typing_message', receiverId)
    console.log('emit timout')
    lastTimeTypingRef.current = Date.now()
    lastReceiverRef.current = receiverId
  }, [newMessageInput])

  //
  const newMessageHandler = (message) => {
    if (message.from === receiverId) {
      setNewMessage(message)
    }
  }
  const onReceiveTypingHandler = (id) => {
    console.log('receive tumeoti')

    if (id !== receiverId) return

    console.log(isTyping)
    if (isTyping == false) {
      setisTyping(true)
      typingTimeOutRef.current = setTimeout(() => {
        console.log('🧨🧨🧨')
        setisTyping(false)
      }, 2000)
    } else if (isTyping == true) {
      console.log('this run')
      clearTimeout(typingTimeOutRef.current)
      typingTimeOutRef.current = setTimeout(() => {
        setisTyping(false)
      }, 2000)
    }
  }

  // listening for incoming message
  useEffect(() => {
    if (socket) {
      socket.on('new_message', newMessageHandler)
      socket.on('typing_message', onReceiveTypingHandler)
    }

    return () => {
      socket?.off('new_message', newMessageHandler)
      socket?.off('typing_message', onReceiveTypingHandler)
    }
  }, [socket, receiverId, isTyping])

  //  scroll to bottom
  useEffect(() => {
    boardBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [allMessages, isTyping])

  // update ui after sending the message
  useEffect(() => {
    const blockLength = allMessages.length

    if (!newMessage) return
    const newAllMessage = [...allMessages]

    // emit new mesage event
    if (socket && newMessage.to === receiverId)
      socket.emit('new_message', newMessage)

    if (blockLength === 0) {
      newAllMessage[0] = []
      newAllMessage[0].push(newMessage)
    } else {
      const lastBlock = allMessages[blockLength - 1]

      if (newMessage.from === lastBlock[0].from) {
        newAllMessage[blockLength - 1].push(newMessage)
      } else {
        newAllMessage[blockLength] = []
        newAllMessage[blockLength].push(newMessage)
      }
      setNewMessage(null)
    }

    setAllMessages(newAllMessage)
  }, [newMessage])

  const sendMessageHandler = (e) => {
    e.preventDefault()
    sendMessage(newMessageInput)
    setNewMessageInput('')
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between bg-white items-center px-4 shadow-md py-3">
        <div className="flex items-center space-x-2">
          {!isLoadingBasicInfo && (
            <>
              <img
                src={userBasicInfo?.profileImage}
                alt="receiver photo"
                className="w-10 h-10 rounded-full shadow-md"
              />
              <p className="font-bold">{userBasicInfo?.username}</p>
            </>
          )}
          {isLoadingBasicInfo && <LoadingSpinner />}
        </div>
        <BsThreeDotsVertical />
      </div>
      <div className="flex flex-col px-10 space-y-8 flex-grow overflow-y-auto pt-4 hide-scrollbar">
        <div className="mt-auto">
          {!isLoadingAll &&
            allMessages?.map((block) => {
              if (block[0].from === receiverId) {
                return (
                  <OtherMessageBlock
                    receiver={userBasicInfo}
                    key={block[0]._id}
                    messages={block}
                  />
                )
              }
              return <MyMessageBlock key={block[0]._id} messages={block} />
            })}
        </div>
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
        {isTyping && (
          <div className="flex justify-start px-8 !mt-4">
            <Comment
              visible={true}
              height="40"
              width="40"
              ariaLabel="comment-loading"
              wrapperStyle={{}}
              wrapperClass="comment-wrapper"
              color="#1e293b"
              backgroundColor="#fff"
            />
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
