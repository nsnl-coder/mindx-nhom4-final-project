import { useRef, useState, useEffect, useContext } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoIosSend } from 'react-icons/io'
import { useParams } from 'react-router-dom'
import InputEmoji from 'react-input-emoji'

//
import { LoadingSpinner } from '../../../components'
import { MessageContext, SocketContext } from '../../../contexts'
import useGetAllMessages from '../../../hooks/useGetAllMessages'
import useGetUserBaiscInfo from '../../../hooks/useGetUserBasicInfo'
import useSendNewMessage from '../../../hooks/useSendNewMessage'
import MyMessageBlock from './MyMessageBlock'
import OtherMessageBlock from './OtherMessageBlock'
import { Comment } from 'react-loader-spinner'

const DirectMessage = () => {
  const { handleNewLatestMessage, seenAllMessagesHandler } =
    useContext(MessageContext)

  const { emitTypingEvent, typingUserId, emitNewMessage, receiveMessage } =
    useContext(SocketContext)
  const [newMessageInput, setNewMessageInput] = useState('')
  // handle send new message
  const { isSending, newMessage, sendMessage, setNewMessage } =
    useSendNewMessage()

  // fetch all the messages with current receiver
  const {
    isLoadingAll,
    allMessages,
    setAllMessages,
    receiverId,
    lastElementRef,
  } = useGetAllMessages()

  //load basic info of current receiver
  const { userBasicInfo, isLoadingBasicInfo } = useGetUserBaiscInfo(receiverId)

  // ref to a div at bottom of message page
  const boardBottomRef = useRef()

  const { socket } = useContext(SocketContext)

  // emit typing event
  useEffect(() => {
    if (newMessageInput.trim().length === 0) return
    emitTypingEvent(receiverId)
  }, [newMessageInput])

  //
  useEffect(() => {
    seenAllMessagesHandler(receiverId)
  }, [receiverId])

  // listening for incoming message
  useEffect(() => {
    if (receiveMessage && receiveMessage.from._id === receiverId) {
      setNewMessage(receiveMessage)
    }
  }, [receiveMessage])

  //  scroll to bottom
  useEffect(() => {
    boardBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [allMessages])

  // update ui after new message
  useEffect(() => {
    const blockLength = allMessages.length
    if (!newMessage) return

    const formartedMessage = {
      from: newMessage.from._id,
      to: newMessage.to._id,
      content: newMessage.content,
      _id: newMessage._id,
    }

    const newAllMessages = [...allMessages]

    if (blockLength === 0) {
      newAllMessages[0] = []
      newAllMessages[0].push(formartedMessage)
    } else {
      const lastBlock = allMessages[blockLength - 1]

      if (formartedMessage.from === lastBlock[0].from) {
        newAllMessages[blockLength - 1].push(formartedMessage)
      } else {
        newAllMessages[blockLength] = []
        newAllMessages[blockLength].push(formartedMessage)
      }
      handleNewLatestMessage(newMessage)
      setNewMessage(null)
    }

    setAllMessages(newAllMessages)
  }, [newMessage])

  // emit message
  useEffect(() => {
    if (newMessage) {
      emitNewMessage(newMessage)
    }
  }, [newMessage])

  const sendMessageHandler = () => {
    if (newMessageInput.length === 0) return

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
      <div className="flex flex-col-reverse px-10 space-y-8 flex-grow overflow-y-auto pt-4">
        <div className="mt-auto pb-8">
          <div ref={lastElementRef} className="mb-6"></div>

          {!isLoadingAll &&
            allMessages?.map((block, index) => {
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
          {isLoadingAll && (
            <div className="flex mt-auto justify-end">
              <LoadingSpinner />
            </div>
          )}

          {isSending && (
            <div className="flex justify-end px-8 !mt-8">
              <p className="text-sm">Sending...</p>
            </div>
          )}
          {typingUserId === receiverId && (
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
        </div>

        {/* <div ref={boardBottomRef}></div> */}
      </div>
      <div className="w-full px-10 mb-8">
        <div onSubmit={sendMessageHandler} className="flex">
          <InputEmoji
            value={newMessageInput}
            onChange={setNewMessageInput}
            cleanOnEnter
            onEnter={sendMessageHandler}
            placeholder="Type a message"
          />
          <button
            className={
              newMessageInput.trim() !== ''
                ? 'text-3xl text-blue-message'
                : 'text-3xl text-text cursor-none pointer-events-none'
            }
            onClick={sendMessageHandler}
          >
            <IoIosSend />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DirectMessage
