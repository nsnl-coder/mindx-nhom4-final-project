import { useContext, useEffect, useRef, useState } from 'react'
import { CiSearch } from 'react-icons/ci'

//
import { SocketContext } from '../../../contexts'
import useSearchUsers from '../../../hooks/useSearchUsers'
import UserListItem from './UserListItem'

const UserList = () => {
  const { onlineUserProfiles, onlineUserIds } = useContext(SocketContext)

  const [keyword, setKeyword] = useState('')
  const [tab, setTab] = useState('active-users')
  const { isLoading, users } = useSearchUsers(keyword)

  return (
    <div className="flex-grow border-r bg-white md:w-80 h-screen flex flex-col">
      <div className="font-medium flex border-b mb-2 [&>button]:flex-grow [&>button]:py-4">
        <button
          className={
            tab === 'active-users'
              ? ' text-primary'
              : 'bg-gray-50 text-gray-400'
          }
          onClick={() => setTab('active-users')}
        >
          Active user ({onlineUserIds?.length})
        </button>
        <button
          className={
            tab === 'all-users' ? ' text-primary' : 'bg-gray-50 text-gray-400'
          }
          onClick={() => setTab('all-users')}
        >
          All users
        </button>
      </div>
      <div className="py-6 relative px-4">
        <div className="absolute top-1/2 -translate-y-1/2 ml-2">
          <CiSearch />
        </div>
        <input
          type="text"
          className="bg-gray-message w-full outline-none py-2 pl-8 pr-4 rounded-lg placeholder:text-sm"
          placeholder="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className="space-y-4 overflow-y-auto flex-grow small-scrollbar">
        {tab === 'active-users' &&
          onlineUserIds?.map((id) => {
            if (onlineUserProfiles[id].username.includes(keyword))
              return (
                <UserListItem
                  key={id}
                  user={onlineUserProfiles[id]}
                  active={true}
                />
              )
            else return null
          })}
        {tab === 'all-users' &&
          users?.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              active={onlineUserIds.includes(user._id)}
            />
          ))}
      </div>
    </div>
  )
}

export default UserList
