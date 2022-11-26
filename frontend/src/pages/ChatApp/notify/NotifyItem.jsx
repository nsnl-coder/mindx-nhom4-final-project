const props = {
  isRead: false,
  _id: '63813c3a45792b96eb9fd01e',
  notifyFrom: {
    _id: '637d44c142eb76ff9bfd29bf',
    username: 'user2',
    profileImage:
      'http://localhost:5000/images/0.3330791590295019-1669414348123.jpeg',
  },
  notifyTo: '637d44c842eb76ff9bfd29c5',
  postId: '6373cc86fc13ae09860005cf',
  notifyType: 'new-message',
  count: 93,
}
import { Link } from 'react-router-dom'

const NotifyItem = () => {
  const { isRead, notifyFrom, notifyTo, postId, notifyType, count } = props

  let title = ''
  let link = ''

  if (notifyType === 'new-message') {
    title = 'send you a message'
    link = `/chat/direct/${notifyFrom._id}`
  }

  if (notifyType === 'new-comment') {
    title = 'commented on your post'
    link = `/post/${postId}`
  }

  if (notifyType === 'new-mention') {
    title = 'mentioned you on a comment'
    link = `/post/${postId}`
  }

  return (
    <Link to={link} className="block ">
      <div className="flex gap-x-3 hover:bg-gray-100 pl-4 py-2 cursor-pointer justify-start">
        <div>
          <img
            src={notifyFrom.profileImage}
            alt={`notify from ${notifyFrom.username}`}
            className="w-14 rounded-full object-cover object-center"
          />
        </div>
        <div className="w-60">
          <div className="text-text">
            <Link
              to={`/profile/${notifyFrom._id}`}
              className="inline-block font-bold"
            >
              {notifyFrom.username}
            </Link>{' '}
            {title}
          </div>
          <p className={isRead ? 'text-sm' : 'text-sm font-bold'}>3 days ago</p>
        </div>
        {!isRead && (
          <div className="w-3 aspect-square mr-3 bg-primary rounded-full self-center"></div>
        )}
      </div>
    </Link>
  )
}

export default NotifyItem
