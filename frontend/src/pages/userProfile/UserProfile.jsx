import { useState, useEffect } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'

import useCallApi from '../../hooks/useCallApi'
import { wrapperWithHeader, ProfileDetail } from '../../components'
import { UserSaved, UserPosts } from '../../components'

const UserProfile = () => {
  const [user, setUser] = useState({})

  const { id: userId } = useParams()

  const { isLoading, error, sendRequest } = useCallApi()

  const useApiData = (data) => {
    setUser(data)
  }

  useEffect(() => {
    sendRequest(
      {
        url: `/api/user/strangerUser/${userId}`,
        method: 'get',
      },
      useApiData
    )
  }, [])
  useEffect(() => {}, [userId])
  return (
    <>
      <div className="bg-white min-h-screen">
        <ProfileDetail user={user} />
        <Routes>
          <Route
            path="saved"
            element={
              <UserSaved user={user} userId={userId} collection="saved" />
            }
          />
          <Route
            path="posts"
            element={
              <UserPosts user={user} userId={userId} collection="posts" />
            }
          />
        </Routes>
      </div>
    </>
  )
}

export default wrapperWithHeader(UserProfile)
