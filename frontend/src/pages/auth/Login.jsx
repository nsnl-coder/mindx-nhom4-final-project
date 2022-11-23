import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'

//
import { useForm } from 'react-hook-form'
import Logo from '../../assets/logo-icon-big.svg'
import useCallApi from '../../hooks/useCallApi'
import { AuthContext } from '../../contexts'

const Login = () => {
  const { setAuth } = useContext(AuthContext)

  const { isLoading, error, sendRequest } = useCallApi()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

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
        data: data,
        method: 'post',
        url: '/api/auth/login',
      },
      applyApi
    )
  }
  useEffect(() => {
    console.log(error)
  }, [error])
  return (
    <div className="flex items-center justify-center h-screen text-black">
      <div className="w-[550px] shadow-md shadow-gray rounded-md p-10 border-[1px] border-gray">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-black mb-5">
              Welcome back!
            </h1>
            <p className="text-dark-gray">Good to see again.</p>
          </div>
          <img src={Logo} alt="" className="w-[150px] h-auto object-cover" />
        </div>
        <div>
          {/* {error && <p>{error}</p>} */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="text-lg font-semibold ">Email address:</label>
            <br />
            <input
              type="email"
              {...register('email', {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              className="w-[80%] rounded-md h-12 px-4 shadow-sm shadow-black  my-2"
            />
            {errors?.email?.type === 'required' && (
              <p className="text-primary">This field is required</p>
            )}
            {errors?.email?.type === 'pattern' && (
              <p className="primary">Invalid email!</p>
            )}
            <br />
            <label className="text-lg font-semibold">Password</label>
            <br />
            <input
              type="password"
              {...register('password', {
                required: true,
              })}
              className="w-[80%] rounded-md h-12 px-4 shadow-sm shadow-black border-[1px] border-gray my-2"
            />
            {errors?.password?.type === 'required' && (
              <p className="text-primary">This field is required</p>
            )}
            <br />
            <button
              type="submit"
              className="rounded-[50px] bg-primary w-[130px] my-4 text-white py-1 text-[17px] font-roboto font-semibold"
            >
              LOGIN
            </button>
            <p className="font-[600] text-[17px] mb-4">
              Don't you have an account?{' '}
              <Link
                to="/auth/register"
                className="text-primary text-lg cursor-pointer"
              >
                Create new{' '}
              </Link>
              now!
            </p>
            <p className="text-black font-semibold hover:underline cursor-pointer">
              Forgotten password?
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
