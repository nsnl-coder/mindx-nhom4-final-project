import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import useCallApi from '../../hooks/useCallApi'
import ellipsisIcon from '../../assets/icon-ellipsis.svg'

const ProfileDetail = ({ userId, collection, user, setUser, handleChange }) => {
  const { isLoading, error, sendRequest } = useCallApi()

  const useApiData = ({ profileImage, firstName, lastName }) => {
    if (data.length > 0) {
      setUser({
        profileImage,
        firstName,
        lastName
      })
    }
  }

  useEffect(() => {
    sendRequest(
      {
        url: `${import.meta.env.VITE_BACKEND_HOST}/api/user/strangerUser/${userId}`,
        method: 'get',
      },
      useApiData
    )
  }, [userId])

  return (
    <div
      className="w-full h-[350px] py-6 md:py-8 flex flex-col items-center justify-between relative"
    >
      <img
        src={user?.profileImage}
        className="w-[150px] h-[150px] rounded-full"
        alt="profile-image"
      />
      <h2 className="text-text text-3xl font-semibold">
        {`${user?.firstName} ${user?.lastName}`}
      </h2>
      <div
        className="h-10 mt-4 w-[240px] rounded-full flex justify-around items-center bg-gray-300"
      >
        <label
          htmlFor="posts"
          className={`cursor-pointer rounded-full w-[45%] py-1 text-text text-center font-medium ${collection === "posts" ? "bg-primary text-white" : "bg-transparent"}`}
          onClick={handleChange}
        >
          <input
            type="radio"
            name="collection"
            className="hidden"
            id="posts"
            value="posts"
          />Posts
        </label>
        <label
          htmlFor="saved" className={`cursor-pointer rounded-full w-[45%] py-1 text-text text-center font-medium ${collection === "saved" ? "bg-primary text-white" : "bg-transparent"}`}
          onClick={handleChange}
        >
          <input
            type="radio"
            name="collection"
            className="hidden"
            id="saved"
            value="saved"
          />Saved
        </label>
      </div>
      <Link
        to="settings"
        className="absolute right-5 top-5 scale-75"
      >
        <img src={ellipsisIcon} alt="icon-ellipsis" />
      </Link>
    </div>
  )
}

export default ProfileDetail