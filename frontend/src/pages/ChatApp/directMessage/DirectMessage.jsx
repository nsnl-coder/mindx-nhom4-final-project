import { useRef } from 'react'
import { useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoIosSend } from 'react-icons/io'
//
import RecentChat from '../messageBoard/RecentChat'
import MyMessage from './MyMessage'
import MyMessageBlock from './MyMessageBlock'
import OtherMessage from './OtherMessage'
import OtherMessageBlock from './OtherMessageBlock'

const DirectMessage = () => {
  const boardBottomRef = useRef()
  useEffect(() => {
    boardBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const sendMessageHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between bg-white items-center px-4 shadow-md">
        <RecentChat />
        <BsThreeDotsVertical />
      </div>
      <div className="flex flex-col px-10 space-y-8 flex-grow overflow-y-auto py-4 hide-scrollbar">
        <MyMessageBlock />
        <OtherMessageBlock />
        <OtherMessageBlock />
        <MyMessageBlock />
        <MyMessageBlock />
        <div ref={boardBottomRef}></div>
      </div>
      <div className="w-full px-10 mb-8">
        <form onSubmit={sendMessageHandler} className="relative">
          <input
            type="text"
            className="w-full py-4 rounded-md outline-none px-6 placeholder:text-sm"
            placeholder="Type something..."
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl text-blue-message">
            <IoIosSend />
          </button>
        </form>
      </div>
    </div>
  )
}

export default DirectMessage
