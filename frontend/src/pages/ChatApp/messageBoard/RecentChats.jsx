import RecentChat from './RecentChat'
import { useContext } from 'react'

//
import useGetLatestMessages from '../../../hooks/useGetLatestMessages'
import { LoadingSpinner } from '../../../components'
import { AuthContext } from '../../../contexts'

const RecentChats = () => {
  const { isLoading, latestMessages } = useGetLatestMessages()
  const { auth } = useContext(AuthContext)

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
        />
      ))}
    </div>
  )
}

export default RecentChats
