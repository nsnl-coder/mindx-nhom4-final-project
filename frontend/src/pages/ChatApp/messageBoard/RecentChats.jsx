import RecentChat from './RecentChat'
import { useContext } from 'react'
import { MessageContext, SocketContext } from '../../../contexts'

//
import { LoadingSpinner } from '../../../components'
import { AuthContext } from '../../../contexts'

const RecentChats = () => {
  const { auth } = useContext(AuthContext)
  const { isLoading, latestMessages } = useContext(MessageContext)
  const { onlineUserIds } = useContext(SocketContext)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isLoading && latestMessages?.length == 0) {
    return <div className="text-sm mt-3">No messages found recently!</div>
  }

  return (
    <div>
      {latestMessages?.map((message) => (
        <RecentChat
          key={message._id}
          message={message}
          currentUserId={auth.userId}
          onlineUserIds={onlineUserIds}
        />
      ))}
    </div>
  )
}

export default RecentChats
