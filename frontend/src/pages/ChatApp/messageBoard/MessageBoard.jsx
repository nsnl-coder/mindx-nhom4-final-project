import { CiSearch } from 'react-icons/ci'
import ActiveUser from './ActiveUser'
import RecentChats from './RecentChats'
import Seperator from './Seperator'

import { SocketContext } from '../../../contexts'
import { useContext } from 'react'

const MessageBoard = () => {
  const { onlineUserProfiles } = useContext(SocketContext)

  return (
    <div className="px-4 h-screen flex flex-col">
      <div className="py-6 relative ">
        <div className="absolute top-1/2 -translate-y-1/2 ml-2">
          <CiSearch />
        </div>
        <input
          type="text"
          className="bg-gray-message w-full outline-0 py-2 pl-8 pr-4 rounded-lg placeholder:text-sm"
          placeholder="Search"
        />
      </div>
      <Seperator text="active users" />
      <div className="flex overflow-x-auto px-4 flex-shrink-0 gap-x-6 py-6 hide-scrollbar">
        {onlineUserProfiles &&
          Object.keys(onlineUserProfiles).map((id) => (
            <ActiveUser key={id} user={onlineUserProfiles[id]} id={id} />
          ))}
      </div>
      <Seperator text="Chats" />
      <div className="flex-grow overflow-y-auto hide-scrollbar">
        <RecentChats />
      </div>
    </div>
  )
}

export default MessageBoard
