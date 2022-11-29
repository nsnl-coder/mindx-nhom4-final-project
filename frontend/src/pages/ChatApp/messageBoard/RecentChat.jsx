import { Link } from 'react-router-dom'

const RecentChat = (props) => {
  const { message, onlineUserIds, typingUserId, currentUserId, messageNotify } =
    props

  const receiver =
    message?.from?._id == currentUserId ? message?.to : message?.from

  const isTyping = typingUserId === receiver?._id
  const { isRead } = message

  const notify = messageNotify.find(
    (noti) => noti.notifyFrom._id === receiver._id
  )

  const notifyCount = notify ? notify.count : 0

  return (
    <Link to={`/chat/direct/${receiver?._id}`}>
      <div className="flex gap-x-3 py-3 hover:bg-gray-message cursor-pointer px-4">
        <div className="relative w-10 h-10">
          <img
            src={receiver?.profileImage}
            alt="Profile image"
            className="w-full h-full object-cover object-center rounded-full flex-shrink-0"
          />
          {onlineUserIds?.includes(receiver?._id) && (
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full absolute right-0.5 -bottom-0.5"></div>
          )}
        </div>
        <div className="text-sm text-text-message flex flex-grow justify-between">
          <div className="">
            <p className="font-bold">{receiver?.username}</p>
            {!isTyping && (
              <p
                className={
                  !isRead && message.from._id !== currentUserId
                    ? 'font-bold'
                    : ''
                }
              >
                {message?.content.slice(0, 17)}
                {message?.content.length > 17 ? '...' : ''}
              </p>
            )}
            {isTyping && <p className="text-blue-message">typing....</p>}
          </div>
          {notifyCount > 0 && (
            <div className="self-end bg-primary w-4 aspect-square flex justify-center items-center text-white rounded-full text-xs">
              {notifyCount > 9 ? '9+' : notifyCount}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default RecentChat
