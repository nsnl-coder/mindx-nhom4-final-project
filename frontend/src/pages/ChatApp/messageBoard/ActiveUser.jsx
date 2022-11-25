import { Link } from 'react-router-dom'

const ActiveUser = ({ user, id }) => {
  return (
    <Link to={`/chat/direct/${id}`}>
      <div className="cursor-pointer">
        <div className="relative w-12 h-12">
          <img
            src={user.profileImage}
            alt="Profile image"
            className="w-full h-full object-cover object-center rounded-full"
          />
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full absolute right-0.5 -bottom-0.5"></div>
        </div>
        <p className="text-sm">{user.username}</p>
      </div>
    </Link>
  )
}

export default ActiveUser
