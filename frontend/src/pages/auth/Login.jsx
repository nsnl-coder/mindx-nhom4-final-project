import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Logo from '../../assets/logo-icon-big.svg'
import useCallApi from '../../hooks/useCallApi'
import { AuthContext } from '../../contexts/AuthContext'
import IconReturn from '../../assets/icon-return.svg'
import { BiError } from 'react-icons/bi'
import { GoEyeClosed, GoEye } from 'react-icons/go'
import { LoadingSpinner } from '../../components'
import { FcGoogle } from 'react-icons/fc'
const Login = () => {
  const navigate = useNavigate()
  const { isLoading, error, sendRequest } = useCallApi()
  const { setAuth } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const applyApi = (user) => {
    if (user.verified === false) {
      navigate(`/auth/verify/${user.id}`, { state: { email: user.email } })
    } else {
      const auth = {
        userId: user._id,
        isLoggedIn: true,
        profileImage: user.profileImage,
        username: user.username,
        token: 'Bearer ' + user.token_access,
      }

      setAuth(auth)
      localStorage.setItem('auth', JSON.stringify(auth))
    }
  }
  const applyApi2 = (user) => {
    sendRequest(
      {
        data: user,
        method: 'post',
        url: `/api/auth/login`,
      },
      applyApi
    )
  }
  const onSubmit = (data) => {
    sendRequest(
      {
        data: data,
        method: 'post',
        url: `/api/auth/login`,
      },
      applyApi
    )
  }
  const changeShowPassword = () => {
    setShowPassword(!showPassword)
  }
  // const googleLogin = () => {
  //   window.open(`${import.meta.env.VITE_BACKEND_HOST}/api/auth/google`, '_self')
  // }
  useEffect(() => {
    sendRequest({ url: `api/auth/login/success` }, applyApi2)
  }, [])
  useEffect(() => {
    setErrorMessage(error?.response?.data?.message)
  }, [error])

  return (
    <div className="flex items-center justify-center h-screen text-black">
      <Link to="/">
        <img
          src={IconReturn}
          alt=""
          className="cursor-pointer absolute md:top-10 md:left-20 top-8 left-5 md:w-[30px] w-[20px] "
        />
      </Link>
      <div className="w-[550px] shadow-md shadow-gray rounded-md p-10 border-[1px] border-gray">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-black mb-5">
              Welcome back!
            </h1>
            <p className="text-dark-gray">Good to see again.</p>
          </div>
          <img
            src={Logo}
            alt=""
            className="md:w-[150px] w-[100px] h-[100px] md:h-auto object-cover"
          />
        </div>
        <div className="md:w-[80%] w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="text-lg font-semibold ">Email address:</label>
            <br />
            <div
              className={`w-full rounded-md relative h-12 outline-none  overflow-hidden shadow-sm shadow-[#3333336d]  my-2 ${
                errors?.email && 'border-[2px] border-primary'
              } ${
                errorMessage === 'Email not valid!' &&
                'border-[2px] border-primary'
              }`}
            >
              <input
                type="email"
                {...register('email', {
                  required: true,
                  pattern:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                className="w-full pl-4 pr-14 h-full outline-none "
              />
              {(errors?.email || errorMessage === 'Email not valid!') && (
                <BiError className="absolute top-[50%] text-xl right-6 -translate-y-[50%] text-primary" />
              )}
            </div>
            {errors?.email?.type === 'required' && (
              <p className="text-primary text-sm">This field is required</p>
            )}
            {errors?.email?.type === 'pattern' && (
              <p className="text-primary text-sm">Invalid email!</p>
            )}
            {!errors?.email?.type &&
              errorMessage === 'Email is not registered!' &&
              !errors?.email && (
                <span className="text-primary text-sm">
                  Email is not registered!
                </span>
              )}
            <br />
            <label className="text-lg font-semibold">Password</label>
            <br />
            <div
              className={`w-full rounded-md h-12 shadow-sm shadow-[#3333336d] overflow-hidden relative my-2 ${
                errors?.password?.type && 'border-[2px] border-primary'
              } ${
                errorMessage === 'Incorrect password!' &&
                'border-[2px] border-primary'
              }`}
            >
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: true,
                  minLength: 8,
                })}
                className="w-full pr-24 h-full px-5 outline-none "
              />
              {errors?.password || errorMessage === 'Incorrect password!' ? (
                <BiError className="absolute top-[50%] text-xl right-6 -translate-y-[50%] text-primary" />
              ) : (
                <div
                  className="absolute top-[50%] text-xl right-6 -translate-y-[50%] cursor-pointer"
                  onClick={changeShowPassword}
                >
                  {showPassword ? <GoEyeClosed /> : <GoEye />}
                </div>
              )}
            </div>
            {errors?.password?.type === 'required' && (
              <p className="text-primary text-sm">This field is required</p>
            )}
            {errors?.password?.type === 'minLength' && (
              <p className="text-primary text-sm">
                {' '}
                Password must be at least 8 characters
              </p>
            )}
            {!errors?.password?.type &&
              errorMessage === 'Incorrect password!' &&
              !errors?.password && (
                <span className="text-primary texl-sm">
                  Incorrect password!
                </span>
              )}
            <br />
            <button
              disabled={isLoading ? true : false}
              type="submit"
              className="rounded-[50px] relative h-[40px] disabled:opacity-50 shadow-sm shadow-black active:shadow-none bg-primary w-[130px] my-4 text-white py-1 text-[17px] font-roboto font-semibold"
            >
              {isLoading ? (
                <span className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[65%]">
                  <LoadingSpinner />
                </span>
              ) : (
                'LOGIN'
              )}
            </button>
          </form>
          <p className="text-center text-lg mb-3">or</p>
          <a href={`${import.meta.env.VITE_BACKEND_HOST}/auth/google`}>
            <button className="w-full h-[50px] gap-4 mb-3 rounded-md flex items-center justify-center border-[2px] border-green-800">
              <FcGoogle className="text-3xl" />
              <span className="font-semibold">Sign in with Google</span>
            </button>
          </a>
          <p className="font-[600] text-[17px] mb-4">
            Don't you have an account?{' '}
            <Link
              to="/auth/register"
              className="text-primary text-lg cursor-pointer underline"
            >
              Create new{' '}
            </Link>
            now!
          </p>
          <Link to="/auth/forgot">
            {' '}
            <p className="text-[#333] text-lg font-semibold hover:underline cursor-pointer">
              Forgotten password?
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
