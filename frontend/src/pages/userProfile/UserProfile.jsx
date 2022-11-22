import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { wrapperWithHeader, Feed } from '../../components'

import logo from '../../assets/logo-icon-big.svg'

const UserProfile = () => {
  const [collection, setCollection] = useState('posts')

  const handleChange = (e) => {
    console.log(e.target)
  }

  const { id: userId } = useParams()

  return (
    <>
      <div className="bg-white">
        <div className="w-full h-80 py-6 md:py-8 flex flex-col items-center justify-between">
          <img src={logo} alt="logo" />
          <h2 className="text-text text-3xl font-semibold">{userId}</h2>
          <div className="h-8 w-[240px] rounded-full flex justify-evenly items-center bg-gray-300">
            <label htmlFor="posts" onClick={handleChange}>
              <input
                type="radio"
                name="collection"
                className="hidden"
                id="posts"
                checked
              />
              Posts
            </label>
            <label htmlFor="saved" onClick={handleChange}>
              <input
                type="radio"
                name="collection"
                className="hidden"
                id="saved"
              />
              Saved
            </label>
          </div>
        </div>
        <Feed />
      </div>
    </>
  )
}

export default wrapperWithHeader(UserProfile)
