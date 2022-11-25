import { useState } from 'react'
import { BsChatSquareDotsFill, BsPerson, BsHeart, BsBell } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useContext } from 'react'

//
import { AuthContext } from '../../../contexts'

const SideBar = () => {
  const [activeTab, setActiveTab] = useState()
  const { auth } = useContext(AuthContext)

  return (
    <div className="flex flex-col py-4">
      <div className="w-full h-20 hover:bg-gray-50 cursor-pointer mb-2 flex justify-center items-center  text-gray-500 font-bold text-4xl">
        <Link to="/">
          <div>U.</div>
        </Link>
      </div>
      <Link to="/chat">
        <div className="w-full h-20 hover:bg-gray-50 cursor-pointer mb-2 flex justify-center items-center  text-gray-500 text-2xl">
          <BsChatSquareDotsFill />
        </div>
      </Link>
      <div className="w-full h-20 hover:bg-gray-50 cursor-pointer mb-2 flex justify-center items-center  text-gray-500 text-3xl">
        <BsPerson />
      </div>
      <div className="w-full h-20 hover:bg-gray-50 cursor-pointer mb-2 flex justify-center items-center  text-gray-500 text-xl">
        <BsHeart />
      </div>
      <div className="w-full h-20 hover:bg-gray-50 cursor-pointer mb-2 flex justify-center items-center  text-gray-500 text-2xl">
        <BsBell />
      </div>
      <Link to="/chat/my-profile">
        <div className="w-full h-20 hover:bg-gray-50 cursor-pointer mb-2 flex justify-center items-center  text-gray-500 text-2xl">
          <img
            src={auth?.profileImage}
            alt="profile image"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </Link>
    </div>
  )
}

export default SideBar
