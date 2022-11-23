import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useCallApi from '../../hooks/useCallApi'
import { showToastSuccess } from '../../utils/toast'
const ForgottenPass = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const { error, isLoading, sendRequest } = useCallApi()
  const [errorMessage, setErrorMessage] = useState('')
  const applyApiData = (data) => {
    showToastSuccess('An email has been sent')
  }
  const onSubmit = (data) => {
    console.log(data)
    sendRequest(
      {
        url: `${import.meta.env.VITE_BACKEND_HOST}/api/auth/forgot-password`,
        method: 'post',
        data,
      },
      applyApiData
    )
  }
  useEffect(() => {
    setErrorMessage(error?.response?.data?.message)
    console.log(error)
  }, [error])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[600px] px-20 py-24 shadow-md shadow-[#333] rounded-lg">
        <h1 className="text-3xl font-bold tracking-wider mb-20">
          Forgotten Password?
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="text-lg font-semibold mb-3">
            Enter your email:
          </label>
          <input
            type="email"
            {...register('email', {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            onChange={() => setErrorMessage('')}
            className={`w-full outline-none mb-8 rounded-md h-12 px-4 shadow-sm shadow-gray border-[1px] border-gray my-2 ${
              errors?.email?.type && 'border-primary border-[2px]'
            } ${
              errorMessage === 'User with given email already Exist!' &&
              'border-[2px] border-primary'
            }`}
          />
          <button
            type="submit"
            className="rounded-[50px] shadow-sm shadow-black active:shadow-none text-white tracking-wider bg-primary w-[150px] h-[40px] text-lg font-semibold"
          >
            SEND EMAIL
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgottenPass
