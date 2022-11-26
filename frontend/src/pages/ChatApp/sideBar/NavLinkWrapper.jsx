import { NavLink } from 'react-router-dom'

const NavLinkWrapper = (props) => {
  const { to, isNotify = false } = props

  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? 'text-primary' : 'text-text')}
      end
    >
      <div className="w-full h-20 hover:bg-gray-50 cursor-pointer mb-2 flex justify-center items-center text-2xl">
        <div className="relative">
          {props.children}
          {isNotify && (
            <div className="w-3 aspect-square rounded-full bg-primary absolute -right-1.5 -top-1.5"></div>
          )}
        </div>
      </div>
    </NavLink>
  )
}

export default NavLinkWrapper
