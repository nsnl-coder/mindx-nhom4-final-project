import { Link, useParams } from 'react-router-dom'

import { IoMdFemale } from 'react-icons/io'
import { IoMdMale } from 'react-icons/io'
import { IoMdTransgender } from 'react-icons/io'

const ProfileDetail = ({ user }) => {
  const data = useParams()

  return (
    <div
      className={`w-full h-full py-6 md:py-8 flex flex-col items-center justify-between relative`}
    >
      <img
        src={user?.profileImage}
        className="wf-[150px] h-[150px] rounded-full"
        alt="profile-image"
      />
      <Link to="." className="max-w-full text-center">
        <h2 className="mt-4 text-text text-3xl font-semibold truncate">
          {user?.firstName && user?.lastName
            ? `${user?.firstName} ${user?.lastName}`
            : `User-${user?._id}`}
        </h2>
        <h3 className="mt-4 text-text text-2xl font-semibold truncate">
          {`(${user?.username})`}
        </h3>
      </Link>
      <Link to={`/chat/direct/${user?._id}`}>Message</Link>
      {data['*'] === '' ? (
        <div className="flex flex-col gap-1 justify-center items-center text-text m-2 text-lg font-semibold">
          <p className="text-rose-400">
            {user?.gender === 'Female' && <IoMdFemale fontSize={36} />}
          </p>
          <p className="text-sky-400">
            {user?.gender === 'Male' && <IoMdMale fontSize={36} />}
          </p>
          <p className="text-gray-400">
            {user?.gender === 'Other' && <IoMdTransgender fontSize={36} />}
          </p>
          <p className="text-gray-500">
            {new Date(user?.dateOfBirth)
              ?.toUTCString()
              .split(' ')
              .slice(1, 4)
              .join(' ')}
          </p>
          <p className="mt-4 text-base font-light">Lists of posts</p>
        </div>
      ) : null}
      <div className="h-10 mt-4 w-[240px] rounded-full flex justify-around items-center bg-gray-300">
        <Link
          to="posts"
          className={`cursor-pointer rounded-full w-[45%] py-1 text-text text-center font-medium ${
            data['*'] === 'posts' ? 'bg-primary text-white' : 'bg-transparent'
          }`}
        >
          Posts
        </Link>
        <Link
          to="saved"
          className={`cursor-pointer rounded-full w-[45%] py-1 text-text text-center font-medium ${
            data['*'] === 'saved' ? 'bg-primary text-white' : 'bg-transparent'
          }`}
        >
          Saved
        </Link>
      </div>
    </div>
  )
}

export default ProfileDetail
