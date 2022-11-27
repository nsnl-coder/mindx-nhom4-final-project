import { useState } from 'react'
import {
  BsChatSquareDotsFill,
  BsFillPersonFill,
  BsFillBellFill,
} from 'react-icons/bs'
import { useContext } from 'react'
import { FaHome } from 'react-icons/fa'

//
import { AuthContext, NotifyContext } from '../../../contexts'
import NavLinkWrapper from './NavLinkWrapper'

const SideBar = () => {
  const { auth } = useContext(AuthContext)
  const { commentNotify, messageNotify } = useContext(NotifyContext)

  return (
    <div className="flex flex-col py-4">
      <NavLinkWrapper to="/">
        <FaHome />
      </NavLinkWrapper>
      <NavLinkWrapper to="/chat/notify">
        <BsFillBellFill />
      </NavLinkWrapper>
      <NavLinkWrapper to="/chat" isNotify={messageNotify}>
        <BsChatSquareDotsFill />
      </NavLinkWrapper>
      <NavLinkWrapper to="/chat/users">
        <BsFillPersonFill />
      </NavLinkWrapper>
      <NavLinkWrapper to="/chat/my-profile">
        <img
          src={auth?.profileImage}
          alt="profile image"
          className="w-10 h-10 rounded-full object-cover"
        />
      </NavLinkWrapper>
    </div>
  )
}

export default SideBar
