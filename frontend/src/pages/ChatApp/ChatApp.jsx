import { Outlet } from 'react-router-dom'

//
import MessageBoard from './messageBoard/MessageBoard'
import SideBar from './sideBar/SideBar'
import { loggedInOnly } from '../../components'

const ChatApp = () => {
  // layout depend on the url
  const pathname = window.location.pathname
  let sidebarClass = ''
  let messageBoardClass = ''
  let directMessageClass = ''

  if (pathname.startsWith('/chat/direct')) {
    sidebarClass = 'hidden sm:block'
    messageBoardClass = 'hidden lg:block'
  }

  if (pathname === '/chat') {
    sidebarClass = 'hidden sm:block'
    directMessageClass = 'hidden md:block'
    messageBoardClass = 'flex-grow md:flex-grow-0 w-80'
  }

  if (pathname === '/chat/my-profile') {
    messageBoardClass = 'hidden'
  }

  return (
    <div className="flex h-screen max-w-full">
      <div className={`w-20 border-r ${sidebarClass}`}>
        <SideBar />
      </div>
      <div className={`border-r ${messageBoardClass}`}>
        <MessageBoard />
      </div>
      <div className={`flex-grow bg-gray-100 ${directMessageClass}`}>
        <Outlet />
      </div>
      <div></div>
    </div>
  )
}

export default loggedInOnly(ChatApp)
