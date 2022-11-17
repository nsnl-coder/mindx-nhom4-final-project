import { Link } from 'react-router-dom'

//
import logo from '../../assets/logo-full.svg'
import searchIcon from '../../assets/icon-search.svg'
import addIcon from '../../assets/icon-add.svg'
import menuIcon from '../../assets/icon-bars.svg'

const SidebarContent = () => {
  return (
    <div className="py-4 shadow-xl sticky top-0 bg-white z-20">
      <div className="max-w-6xl mx-auto flex items-center gap-x-14 px-10">
        <div className="flex items-center flex-grow ">
          <label htmlFor="my-drawer" className="drawer-button lg:hidden">
            <img src={menuIcon} alt="" className="w-6 cursor-pointer" />
          </label>
          <div className="w-full gap-x-4 hidden lg:flex">
            <Link to="/">
              <img src={logo} alt="" className="h-10" />
            </Link>
            <div className="flex w-full items-center gap-x-3">
              <input
                type="text"
                className="border px-4 flex-grow ml-8 h-9 rounded-full bg-gray-50 outline-none text-sm focus:shadow-sm"
              />
              <img src={searchIcon} alt="" className="w-6 h-6 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-5">
          <Link to="/profile/nsnhatlong">
            <img
              src="https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/nancy_momoland_main_wm.png"
              alt=""
              className="w-9 aspect-square object-cover object-center rounded-full"
            />
          </Link>
          <Link to="/new-post">
            <img src={addIcon} alt="" className="h-9" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SidebarContent
