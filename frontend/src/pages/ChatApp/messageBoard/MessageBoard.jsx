import ActiveUser from './ActiveUser'
import RecentChats from './RecentChats'
import Seperator from './Seperator'

import { SocketContext } from '../../../contexts'
import { useContext } from 'react'

const MessageBoard = () => {
  const { onlineUserProfiles } = useContext(SocketContext)

  return (
    <div className="px-4 h-screen flex flex-col pt-4 md:w-80">
      <Seperator text="active users" />
      <div className="flex overflow-x-auto px-4 flex-shrink-0 gap-x-6 py-6 hide-scrollbar">
        {onlineUserProfiles &&
          Object.keys(onlineUserProfiles).map((id) => (
            <ActiveUser key={id} user={onlineUserProfiles[id]} id={id} />
          ))}
        {!onlineUserProfiles && (
          <p className="text-sm">Something went wrong! Try again later</p>
        )}
      </div>
      <Seperator text="Chats" />
      <div className="flex-grow overflow-y-auto hide-scrollbar">
        <RecentChats />
      </div>
    </div>
  )
}

export default MessageBoard
