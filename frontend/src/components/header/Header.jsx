import { useEffect, useState } from 'react'
import { useContext } from 'react'

import NavBar from './NavBar'
import Sidebar from './Sidebar'
import { AuthContext } from '../../contexts'

const Header = (props) => {
  const [isSideBarShow, setIsSideBarShow] = useState(false)
  const { auth } = useContext(AuthContext)

  const toggleSideBarVisivility = () => {
    setIsSideBarShow((prevState) => !prevState)
  }

  useEffect(() => {
    if (isSideBarShow) {
      document.querySelector('body').classList.add('overflow-y-hidden')
    } else {
      document.querySelector('body').classList.remove('overflow-y-hidden')
    }
    console.log(isSideBarShow)
  }, [isSideBarShow])

  return (
    <div className="drawer h-auto">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <NavBar toggleSideBarVisivility={toggleSideBarVisivility} auth={auth} />
        {props.children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          className="drawer-overlay"
          onClick={toggleSideBarVisivility}
        ></label>
        <Sidebar auth={auth} />
      </div>
    </div>
  )
}

export default Header
