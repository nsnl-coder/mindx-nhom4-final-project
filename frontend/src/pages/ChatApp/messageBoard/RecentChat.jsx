import { Link } from 'react-router-dom'

const RecentChat = ({ message, onlineUserIds, isTyping, currentUserId }) => {
  const receiver =
    message?.from?._id == currentUserId ? message?.to : message?.from

  const { isRead } = message

  return (
    <Link to={`/chat/direct/${receiver?._id}`}>
      <div className="flex gap-x-3 py-3 hover:bg-gray-message cursor-pointer px-4">
        <div className="relative w-10 h-10">
          <img
            src={receiver?.profileImage}
            alt="Profile image"
            className="w-full h-full object-cover object-center rounded-full flex-shrink-0"
          />
          {onlineUserIds.includes(receiver._id) && (
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full absolute right-0.5 -bottom-0.5"></div>
          )}
        </div>
        <div className="text-sm text-text-message">
          <p className="font-bold">{receiver?.username}</p>
          {!isTyping && (
            <p
              className={
                !isRead && message.from._id !== currentUserId ? 'font-bold' : ''
              }
            >
              {message?.content.slice(0, 17)}
              {message?.content.length > 17 ? '...' : ''}
            </p>
          )}
          {isTyping && <p className="text-blue-message">typing....</p>}
        </div>
      </div>
    </Link>
  )
}

export default RecentChat
