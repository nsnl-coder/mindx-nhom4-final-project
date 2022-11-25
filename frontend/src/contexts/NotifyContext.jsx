import { createContext, useState } from 'react'

const NotifyContext = createContext()

const NotificationContextProvider = (props) => {
  const [commentNotify, setCommentNotify] = useState(false)
  const [messageNotify, setMessageNotify] = useState(false)
  const [mentionNotify, setMentionNotify] = useState(false)
  return (
    <NotifyContext.Provider
      value={{
        commentNotify,
        messageNotify,
        mentionNotify,
        setCommentNotify,
        setMentionNotify,
        setMessageNotify,
      }}
    >
      {props.children}
    </NotifyContext.Provider>
  )
}

export default NotificationContextProvider
export { NotifyContext }
