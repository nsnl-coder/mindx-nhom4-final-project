import { useState } from 'react'
import { BsChatSquareDotsFill, BsPerson, BsHeart, BsBell } from 'react-icons/bs'
import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useContext } from 'react'

//
import { AuthContext, NotifyContext } from '../../../contexts'
import NavLinkWrapper from './NavLinkWrapper'

const SideBar = () => {
  const { auth } = useContext(AuthContext)
  const { commentNotify, messageNotify } = useContext(NotifyContext)

  return (
    <div className="flex flex-col py-4">
      <NavLinkWrapper to="/">
        <BiArrowBack />
      </NavLinkWrapper>
      <NavLinkWrapper to="/chat/notifications">
        <BsBell />
      </NavLinkWrapper>
      <NavLinkWrapper to="/chat" isNotify={messageNotify}>
        <BsChatSquareDotsFill />
      </NavLinkWrapper>
      <NavLinkWrapper to="/other-people">
        <BsPerson />
      </NavLinkWrapper>
      <NavLinkWrapper to="/chat/my-profile">
        <img
          src={auth?.profileImage}
          alt="profile image"
          className="w-10 h-10 rounded-full"
        />
      </NavLinkWrapper>
    </div>
  )
}

export default SideBar
