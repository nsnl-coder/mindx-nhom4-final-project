import { Link } from 'react-router-dom'

const UserListItem = (props) => {
  const { user, active } = props
  return (
    <Link to={`/chat/direct/${user?._id}`}>
      <div className="px-4 py-2 hover:bg-gray-100 font-bold flex space-x-2">
        <div className="relative w-12 h-12">
          <img
            src={user.profileImage}
            alt="Profile image"
            className="w-full h-full object-cover object-center rounded-full"
          />
          {active && (
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full absolute right-0.5 -bottom-0.5"></div>
          )}
        </div>

        <div>
          <p>{user.username}</p>
        </div>
      </div>
    </Link>
  )
}

export default UserListItem
