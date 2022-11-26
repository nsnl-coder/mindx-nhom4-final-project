import { useContext, useEffect, useRef, useState } from 'react'
import { CiSearch } from 'react-icons/ci'

//
import { LoadingSpinner, ScrollToTop } from '../../../components'
import { SocketContext } from '../../../contexts'
import useSearchUsers from '../../../hooks/useSearchUsers'
import UserListItem from './UserListItem'

const UserList = () => {
  const { onlineUserProfiles, onlineUserIds } = useContext(SocketContext)

  const [keyword, setKeyword] = useState('')
  const [tab, setTab] = useState('all-users')
  const topContainerRef = useRef()
  const containerRef = useRef()

  const { isLoading, users, lastElementRef, noResultFound } =
    useSearchUsers(keyword)

  const [showButton, setShowButton] = useState(true)

  useEffect(() => {
    if (
      containerRef.current.scrollHeight - 100 >
      containerRef.current.clientHeight
    ) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
    console.log(containerRef.current.scrollHeight)
    console.log(containerRef.current.clientHeight)
  }, [tab, users])

  return (
    <div className="flex-grow border-r bg-white md:w-80 h-screen flex flex-col relative">
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
      <div
        className="space-y-4 overflow-y-auto flex-grow small-scrollbar relative"
        ref={containerRef}
      >
        <div ref={topContainerRef}></div>
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
          users.length > 0 &&
          users?.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              active={onlineUserIds.includes(user._id)}
            />
          ))}
        {tab === 'all-users' && noResultFound && (
          <div className="px-4">No user found with that keywords</div>
        )}

        {isLoading && (
          <div className="px-4">
            <LoadingSpinner />
          </div>
        )}
        <div ref={lastElementRef}></div>
      </div>
      {showButton && (
        <ScrollToTop
          topContainerRef={topContainerRef}
          containerRef={containerRef}
        />
      )}
    </div>
  )
}

export default UserList
