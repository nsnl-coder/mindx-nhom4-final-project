import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { wrapperWithHeader, Feed, ProfileDetail } from '../../components'

const UserProfile = () => {
  const [user, setUser] = useState({})
  const [collection, setCollection] = useState("posts")

  const handleChange = (e) => {
    if (!e.target.value) return
    setCollection(e.target.value)
  }

  const { id: userId } = useParams()

  return (
    <>
      <div className="bg-white min-h-screen">
        <ProfileDetail userId={userId} collection={collection} user={user} setUser={setUser} handleChange={handleChange} />
        <Feed userId={userId} user={user} collection={collection} />
      </div>
    </>
  )
}

export default wrapperWithHeader(UserProfile)
