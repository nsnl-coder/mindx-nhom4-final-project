import NavBar from './NavBar'
import Sidebar from './Sidebar'

const Header = (props) => {
  return (
    <div className="drawer h-auto">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <NavBar />
        {props.children}
      </div>
      <Sidebar />
    </div>
  )
}

export default Header
