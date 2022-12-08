import { useRef, useState } from 'react'
import { MentionsInput, Mention } from 'react-mentions'
import useCallApi from '../../hooks/useCallApi'
import defaultMentionStyle from './defaultMentionStyle'
import defaultStyle from './defaultStyle'

const ReactMentions = ({ value, setValue, placeholder }) => {
  const { sendRequest } = useCallApi()
  const timeoutRef = useRef()

  const fetchUsers = (query, cb) => {
    if (!query) return

    const applyApiData = (res) => {
      const users = res.data
      const displayUsers = users.map((user) => {
        return { id: user._id, display: `${user.firstName} ${user.lastName}` }
      })
      cb(displayUsers)
    }

    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      sendRequest(
        {
          url: `/api/user/search-users?keyword=${query}`,
        },
        applyApiData
      )
    }, 1500)
  }

  return (
    <div className="px-4">
      <MentionsInput
        style={defaultStyle}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      >
        <Mention style={defaultMentionStyle} trigger="@" data={fetchUsers} />
      </MentionsInput>
    </div>
  )
}

export default ReactMentions
