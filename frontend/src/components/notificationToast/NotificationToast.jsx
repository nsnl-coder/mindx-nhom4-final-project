import NotifyItem from '../../pages/ChatApp/notify/NotifyItem'

const NotificationToast = (props) => {
  const { noti, isToast } = props

  return (
    <div>
      <NotifyItem noti={noti} isToast={isToast} />
    </div>
  )
}

export default NotificationToast
