import { Link } from 'react-router-dom'

import searchIcon from '../../assets/icon-search.svg'
import logo from '../../assets/logo-full.svg'

const Sidebar = () => {
  return (
    <div className="w-80 h-screen bg-white px-4 py-4 flex flex-col">
      <div className="flex-grow">
        <Link to="/">
          <img src={logo} alt="logo" className="h-8 mb-6" />
        </Link>
        <div className="flex w-full items-center gap-x-3">
          <input
            type="text"
            className="border px-4 flex-grow h-9 rounded-full bg-gray-50 outline-none text-md text-gray-500 focus:shadow-sm"
          />
          <img
            src={searchIcon}
            alt="search"
            className="w-6 h-6 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <img
          src="https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/nancy_momoland_main_wm.png"
          alt=""
          className="w-9 aspect-square object-cover object-center rounded-full"
        />
        <p className="font-semibold">Nancy Momoland</p>
      </div>
    </div>
  )
}

export default Sidebar
