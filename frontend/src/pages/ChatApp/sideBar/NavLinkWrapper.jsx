import { NavLink } from 'react-router-dom'

const NavLinkWrapper = (props) => {
  const { to, notifyCount = 0 } = props

  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? 'text-primary' : 'text-text')}
      end
    >
      <div className="w-full h-20 hover:bg-gray-50 cursor-pointer mb-2 flex justify-center items-center text-2xl">
        <div className="relative">
          {props.children}
          {notifyCount > 0 && (
            <div className="w-5 aspect-square rounded-full text-white text-xs flex justify-center items-center bg-primary absolute -right-2.5 -top-2">
              {notifyCount > 9 ? '9+' : notifyCount}
            </div>
          )}
        </div>
      </div>
    </NavLink>
  )
}

export default NavLinkWrapper
