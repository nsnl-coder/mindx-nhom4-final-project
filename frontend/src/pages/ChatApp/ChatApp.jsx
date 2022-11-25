import { Outlet } from 'react-router-dom'

//
import MessageBoard from './messageBoard/MessageBoard'
import SideBar from './sideBar/SideBar'
import { loggedInOnly } from '../../components'

const ChatApp = () => {
  return (
    <div className="flex h-screen max-w-full">
      <div className="w-20 border-r">
        <SideBar />
      </div>
      <div className="w-80 border-r flex-shrink-0">
        <MessageBoard />
      </div>
      <div className="flex-grow bg-gray-100">
        <Outlet />
      </div>
      <div></div>
    </div>
  )
}

export default loggedInOnly(ChatApp)
