import { Button } from '../../components'
import { BsFillBookmarksFill } from 'react-icons/bs'
import ProfileImageAndName from './ProfileImageAndName'

const SavedUsers = ({ savedUsers }) => {
  return (
    <>
      {savedUsers.length > 0 &&
        savedUsers.map((user) => (
          <ProfileImageAndName key={user._id} user={user} />
        ))}
      {savedUsers.length == 0 && (
        <div className="flex-col flex flex-grow justify-center items-center text-gray-300 text-7xl">
          <BsFillBookmarksFill />
          <p className="text-base mb-12 mt-4">
            No one saves yet! Why not be the first one!
          </p>
        </div>
      )}
    </>
  )
}

export default SavedUsers
