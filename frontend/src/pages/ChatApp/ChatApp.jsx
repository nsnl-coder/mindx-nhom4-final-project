import MessageBoard from './messageBoard/MessageBoard'
import SideBar from './sideBar/SideBar'
import DirectMessage from './directMessage/DirectMessage'

const ChatApp = () => {
  return (
    <div className="flex h-screen">
      <div className="w-20 border-r">
        <SideBar />
      </div>
      <div className="w-80 border-r">
        <MessageBoard />
      </div>
      <div className="flex-grow bg-gray-100">
        <DirectMessage />
      </div>
      <div></div>
    </div>
  )
}

export default ChatApp
