import { useState } from 'react'
import { BsChatSquareDotsFill, BsPerson, BsHeart, BsBell } from 'react-icons/bs'

const SideBar = () => {
  const [activeTab, setActiveTab] = useState()

  return (
    <div className="flex flex-col py-4">
      <div className="w-full h-20 hover:bg-gray-50 cursor-pointer mb-2 flex justify-center items-center  text-gray-500 font-bold text-4xl">
        <div>U.</div>
      </div>
      <div className="w-full h-20 hover:bg-gray-50 cursor-pointer mb-2 flex justify-center items-center  text-gray-500 text-2xl">
        <BsChatSquareDotsFill />
      </div>
      <div className="w-full h-20 hover:bg-gray-50 cursor-pointer mb-2 flex justify-center items-center  text-gray-500 text-3xl">
        <BsPerson />
      </div>
      <div className="w-full h-20 hover:bg-gray-50 cursor-pointer mb-2 flex justify-center items-center  text-gray-500 text-xl">
        <BsHeart />
      </div>
      <div className="w-full h-20 hover:bg-gray-50 cursor-pointer mb-2 flex justify-center items-center  text-gray-500 text-2xl">
        <BsBell />
      </div>
    </div>
  )
}

export default SideBar
