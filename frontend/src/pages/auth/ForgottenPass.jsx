import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import useCallApi from '../../hooks/useCallApi'
import { showToastSuccess } from '../../utils/toast'
import IconReturn from '../../assets/icon-return.svg'
import { BiError } from 'react-icons/bi'
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
      <Link to="/auth/login">
        <img
          src={IconReturn}
          alt=""
          className="cursor-pointer absolute top-10 left-20"
        />
      </Link>
      <div className="w-[600px] px-20 py-24 shadow-sm shadow-[#333] rounded-lg">
        <h1 className="text-3xl font-bold tracking-wider mb-20">
          Forgotten Password?
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="text-lg font-semibold mb-3">
            Enter your email:
          </label>
          <div
            className={`w-full outline-none  rounded-md relative    h-12 px-4 shadow-sm shadow-[#3333336d]  my-2 ${
              errors?.email && 'border-primary border-[2px]'
            } ${
              errorMessage === 'Email not valid' &&
              ' border-primary border-[2px]'
            }`}
          >
            <input
              type="email"
              {...register('email', {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              onChange={() => setErrorMessage('')}
              className="w-[80%] h-full outline-none "
            />
            {(errors?.email || errorMessage) && (
              <BiError className="absolute top-[50%] text-xl right-6 -translate-y-[50%] text-primary" />
            )}
          </div>
          {errors?.email?.type === 'required' && (
            <p className="text-primary">This field is required</p>
          )}
          {errors?.email?.type === 'pattern' && (
            <p className="text-primary">Email not valid!</p>
          )}
          {errorMessage === 'Email not valid' && (
            <p className="text-primary">Email is not registered!</p>
          )}
          <button
            type="submit"
            className="rounded-[50px] mt-8 shadow-sm shadow-black active:shadow-none text-white tracking-wider bg-primary w-[150px] h-[40px] text-lg font-semibold"
          >
            SEND EMAIL
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgottenPass
