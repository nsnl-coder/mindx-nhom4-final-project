import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import searchIcon from '../../assets/icon-search.svg'
import logo from '../../assets/logo-full.svg'

const Sidebar = ({ auth }) => {
  const navigate = useNavigate()
  const [useSearchParam, setUserSearchParam] = useSearchParams()

  const [text, setText] = useState(useSearchParam.get('q'))

  const handleInput = (e) => {
    setText(e.target.value)
  }
  const handleSearch = (e) => {
    e.preventDefault()
    if (text) {
      navigate(`/search?q=${text}`)
    }
  }
  
  return (
    <div className="w-80 h-screen bg-white px-4 py-4 flex flex-col">
      <div className="flex-grow">
        <Link to="../">
          <img src={logo} alt="logo" className="h-8 mb-6" />
        </Link>
        <form
          className="flex w-full items-center gap-x-3"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            onChange={handleInput}
            className="border px-4 flex-grow h-9 rounded-full bg-gray-50 outline-none text-md text-gray-500 focus:shadow-sm"
          />
          <button type="submit">
            <img
              src={searchIcon}
              alt="search"
              className="w-6 h-6 cursor-pointer"
            />
          </button>
        </form>
      </div>
      {auth.isLoggedIn ?
        <div className="flex items-center space-x-2">
          <img
            src={auth?.profileImage}
            alt="profile image"
            className="w-9 aspect-square object-cover object-center rounded-full"
          />
          <p className="font-semibold">{auth?.username}</p>
        </div> : null}
    </div>
  )
}

export default Sidebar
