import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NotifyItem = (props) => {
  const { noti, isToast = false } = props
  const { t } = useTranslation()

  let title = ''
  let link = ''

  if (noti?.notifyType === 'new-message') {
    title = t('new_message')
    link = `/chat/direct/${noti?.notifyFrom?._id}`
  }

  if (noti?.notifyType === 'new-comment') {
    title = t('new_comment')
    link = `/post/${noti?.postId}?commentId=${noti.commentId}`
  }

  if (noti?.notifyType === 'new-mention') {
    title = t('new_mention')
    link = `/post/${noti?.postId}?commentId=${noti.commentId}`
  }

  return (
    <Link
      to={`${link}`}
      className={!isToast ? 'hover:bg-gray-100 block' : 'block'}
    >
      <div className="flex gap-x-3 pl-4 py-2 cursor-pointer justify-start">
        <div>
          <img
            src={noti?.notifyFrom?.profileImage}
            alt={`notify from ${noti?.notifyFrom?.username}`}
            className="w-12 aspect-square rounded-full object-cover object-center"
          />
        </div>
        <div className="w-60">
          <div className="text-text">
            <div className="inline-block font-bold">
              {noti?.notifyFrom?.username}
            </div>{' '}
            {title}
          </div>
          <p className="text-sm text-text">
            {noti?.notifyContent || noti?.content}...
          </p>
          {/* {!isToast && (
            <p className={noti?.count > 0 ? 'text-sm' : 'text-sm font-bold'}>
              Few seconds ago
            </p>
          )} */}
          {isToast && <p className="text-xs mt-1">Few seconds ago</p>}
        </div>
        {noti?.count > 0 && !isToast && (
          <div className="w-3 aspect-square mr-3 bg-primary rounded-full self-center"></div>
        )}
      </div>
    </Link>
  )
}

export default NotifyItem
