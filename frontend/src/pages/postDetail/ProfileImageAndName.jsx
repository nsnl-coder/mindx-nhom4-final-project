import { Link } from 'react-router-dom'

const ProfileImageAndName = ({ user, date }) => {
  return (
    <div className="flex items-start gap-x-6">
      <div className="w-12 aspect-square overflow-hidden bg-gray-100 flex-shrink-0 rounded-full">
        <Link to={`/profile/${user?._id}`}>
          <img
            src={user?.profileImage}
            alt="profile image"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      <div>
        <Link to={`/profile/${user?._id}`}>
          <p className="font-semibold">{user?.username}</p>
        </Link>
        {date && (
          <p className="text-sm text-gray-500">
            {new Date(date).toDateString()}
          </p>
        )}
      </div>
    </div>
  )
}

export default ProfileImageAndName
