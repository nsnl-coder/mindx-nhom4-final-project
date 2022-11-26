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
  let outletClass = ''

  if (pathname.startsWith('/chat/direct')) {
    sidebarClass = 'hidden sm:block'
    messageBoardClass = 'hidden lg:block'
  }

  if (pathname === '/chat') {
    sidebarClass = 'hidden ss:block'
    outletClass = 'hidden md:block'
    messageBoardClass = 'flex-grow md:flex-grow-0 w-80'
  }

  if (pathname === '/chat/my-profile') {
    messageBoardClass = 'hidden'
  }

  if (pathname === '/chat/notify') {
    messageBoardClass = 'hidden'
    outletClass = ''
  }
  if (pathname === '/chat/users') {
    messageBoardClass = 'hidden'
  }

  return (
    <div className="flex h-screen max-w-full overflow-hidden">
      <div className={`w-20 border-r ${sidebarClass}`}>
        <SideBar />
      </div>
      <div className={`border-r ${messageBoardClass}`}>
        <MessageBoard />
      </div>
      <div className={`flex-grow bg-gray-100 ${outletClass}`}>
        <Outlet />
      </div>
    </div>
  )
}

export default loggedInOnly(ChatApp)
