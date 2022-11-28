import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { FaUserPlus, FaUser } from 'react-icons/fa'
import { RiLogoutCircleFill, RiMessageFill } from 'react-icons/ri'
import { IoSettingsSharp } from 'react-icons/io5'
import { AiFillHome } from 'react-icons/ai'
import { MdAddCircle } from 'react-icons/md'

//
import logo from '../../assets/logo-full.svg'
import searchIcon from '../../assets/icon-search.svg'
import menuIcon from '../../assets/icon-bars.svg'
import useLogUserOut from '../../hooks/useLogUserOut'
import { useContext } from 'react'
import { NotifyContext } from '../../contexts'

const NavBar = ({ toggleSideBarVisivility, auth }) => {
  const navigate = useNavigate()
  const { userId, profileImage, username, isLoggedIn } = auth
  const { logOut } = useLogUserOut()
  const [useSearchParam, setUserSearchParam] = useSearchParams()
  const { messageNotify, commentNotify } = useContext(NotifyContext)

  const [text, setText] = useState(useSearchParam.get('q'))
  const isNotify = messageNotify || commentNotify
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
    <div className="py-4 shadow-xl sticky top-0 bg-white z-20">
      <div className="max-w-6xl mx-auto flex items-center gap-x-14 px-10">
        <div className="flex items-center flex-grow ">
          <label
            htmlFor="my-drawer"
            className="drawer-button md:hidden hover:shadow-lg"
          >
            <img
              src={menuIcon}
              alt="menu"
              className="w-6 cursor-pointer"
              onClick={toggleSideBarVisivility}
            />
          </label>
          <div className="w-full gap-x-4 hidden md:flex">
            <Link to="/">
              <img src={logo} alt="logo" className="h-10" />
            </Link>
            <form
              className="flex w-full items-center gap-x-3"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                value={text}
                onChange={(e) => handleInput(e)}
                className="border px-4 flex-grow ml-8 h-9 rounded-full bg-gray-50 outline-none text-md text-gray-500 focus:shadow-sm"
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
        </div>
        {isLoggedIn && (
          <div className="dropdown dropdown-hover dropdown-end pl-6">
            <label tabIndex={0} className="text-3xl cursor-pointer bg-red-400">
              <img
                src={profileImage}
                alt="profile image"
                className="w-9 aspect-square object-cover object-center rounded-full"
              />
              {isNotify && (
                <div className="w-3 aspect-square rounded-full bg-primary absolute -right-1.5 top-0.5"></div>
              )}
            </label>
            <div tabIndex={0} className="dropdown-content menu w-52 pt-6">
              <ul className="bg-base-100 shadow-md">
                <li>
                  <Link to={'/'}>
                    <AiFillHome />
                    Feeds
                  </Link>
                </li>
                <li>
                  <Link to={`/profile/${userId}`}>
                    <FaUser />
                    {username}
                  </Link>
                </li>
                <li>
                  <Link to={'/chat'}>
                    <RiMessageFill />
                    Messenger
                    {messageNotify && (
                      <div className="w-3 aspect-square rounded-full bg-primary ml-auto"></div>
                    )}
                  </Link>
                </li>
                <li>
                  <Link to={`/new-post`}>
                    <MdAddCircle />
                    New post
                  </Link>
                </li>
                <li>
                  <Link to={`/settings`}>
                    <IoSettingsSharp />
                    settings
                  </Link>
                </li>
                <li className="text-text" onClick={logOut}>
                  <a>
                    <RiLogoutCircleFill />
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
        {!isLoggedIn && (
          <div className="dropdown dropdown-hover dropdown-end pl-6">
            <label tabIndex={0} className="text-2xl cursor-pointer bg-red-400">
              <FaUserPlus />
            </label>
            <div tabIndex={0} className="dropdown-content menu w-52 pt-4">
              <ul className="bg-base-100 shadow-md">
                <li>
                  <Link
                    to="/auth/login"
                    className="text-text focus:bg-gray-200"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/register"
                    className="text-text focus:bg-gray-200"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar
