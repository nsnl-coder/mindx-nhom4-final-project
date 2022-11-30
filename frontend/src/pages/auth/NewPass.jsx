import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, Link } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'
import { GoEyeClosed, GoEye } from 'react-icons/go'

import useCallApi from '../../hooks/useCallApi'
import { AuthContext } from '../../contexts'
import { useNavigate } from 'react-router-dom'
import { Error } from '../../components'
import IconReturn from '../../assets/icon-return.svg'
import { LoadingSpinner } from '../../components'
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
  const [showPassword, setShowPassword] = useState(false)
  const applyApicheck = () => {
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
  const TogglePassword = () => {
    setShowPassword(!showPassword)
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
      {isLoading ? (
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <TailSpin />
        </div>
      ) : (
        <div>
          <Link to="/auth/login">
            <img
              src={IconReturn}
              alt=""
              className="cursor-pointer absolute top-10 left-20"
            />
          </Link>
          {successs ? (
            <div className="flex items-center justify-center h-screen">
              <div className="w-[600px] px-20 py-20 shadow-md shadow-[#333] rounded-lg">
                <h1 className="text-3xl font-bold tracking-wider mb-20">
                  Forgotten Password?
                </h1>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col"
                >
                  <label className="text-lg font-semibold mb-3">
                    New Password:
                  </label>
                  <div
                    className={`w-full relative outline-none rounded-md h-12 px-4  mt-2 ${
                      errors?.password
                        ? 'border-primary border-[2px] '
                        : 'border-[1px] border-[#33333392]'
                    } ${
                      errorMessage === 'User with given email already Exist!' &&
                      'border-[2px] border-primary'
                    }`}
                  >
                    <input
                      onChange={() => setErrorMessage('')}
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', {
                        required: true,
                        minLength: 8,
                      })}
                      className="w-[80%] h-full outline-none"
                    />
                    <span
                      onClick={TogglePassword}
                      className="absolute right-4 cursor-pointer top-[50%] -translate-y-[50%]"
                    >
                      {showPassword ? <GoEyeClosed /> : <GoEye />}
                    </span>
                  </div>
                  {errors?.password?.type === 'required' && (
                    <p className="text-primary">This field is required</p>
                  )}
                  {errors?.password?.type === 'minLength' && (
                    <span className="text-primary">
                      Password must be at least 8 characters
                    </span>
                  )}

                  <button
                    type="submit"
                    className="rounded-[50px] relative mt-8 shadow-sm shadow-black active:shadow-none text-white tracking-wider bg-primary w-[150px] h-[40px] text-lg font-semibold"
                  >
                    {isLoading ? (
                      <span className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[65%]">
                        <LoadingSpinner />
                      </span>
                    ) : (
                      'SIGN UP'
                    )}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <Error />
          )}
        </div>
      )}
    </>
  )
}

export default NewPass
