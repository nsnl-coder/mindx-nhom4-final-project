import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import useCallApi from '../../hooks/useCallApi'
import { AuthContext } from '../../contexts'
import { useContext } from 'react'
import { Error } from '../../components'
const NewPass = () => {
  const { id, token } = useParams()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const { setAuth } = useContext(AuthContext)
  const { error, isLoading, sendRequest } = useCallApi()
  const [errorMessage, setErrorMessage] = useState('')
  const [successs, setSuccess] = useState(false)
  const applyApicheck = (data) => {
    setSuccess(true)
  }

  const applyApi = (user) => {
    const auth = {
      userId: user._id,
      isLoggedIn: true,
      profileImage: user.profileImage,
      username: user.username,
      token: 'Bearer ' + user.token_access,
    }
    console.log(auth)
    setAuth(auth)
    localStorage.setItem('auth', JSON.stringify(auth))
  }
  const onSubmit = (data) => {
    sendRequest(
      {
        url: `${
          import.meta.env.VITE_BACKEND_HOST
        }/api/auth/reset-password/${id}/${token}`,
        data,
        method: 'post',
      },
      applyApi
    )
  }

  useEffect(() => {
    sendRequest(
      {
        url: `${
          import.meta.env.VITE_BACKEND_HOST
        }/api/auth/checkLink-forgot/${id}/${token}`,
        method: 'get',
      },
      applyApicheck
    )
  }, [])
  useEffect(() => {
    setErrorMessage(error)
    console.log(error)
  }, [error])
  return (
    <>
      {successs ? (
        <div className="flex items-center justify-center h-screen">
          <div className="w-[600px] px-20 py-24 shadow-md shadow-[#333] rounded-lg">
            <h1 className="text-3xl font-bold tracking-wider mb-20">
              Forgotten Password?
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="text-lg font-semibold mb-3">
                New Password:
              </label>
              <input
                type="password"
                {...register('password', {
                  required: true,
                })}
                onChange={() => setErrorMessage('')}
                className={`w-full outline-none mb-8 rounded-md h-12 px-4 shadow-sm shadow-[#333] border-[1px] border-gray my-2 ${
                  errors?.password?.type && 'border-primary border-[2px]'
                } ${
                  errorMessage === 'User with given email already Exist!' &&
                  'border-[2px] border-primary'
                }`}
              />
              {errors?.password?.type === 'required' && (
                <p className="text-primary">This field is required</p>
              )}

              <button
                type="submit"
                className="rounded-[50px] shadow-sm shadow-black active:shadow-none text-white tracking-wider bg-primary w-[150px] h-[40px] text-lg font-semibold"
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </>
  )
}

export default NewPass
