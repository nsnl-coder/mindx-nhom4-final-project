import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Logo from '../../assets/logo-icon-big.svg'
import useCallApi from '../../hooks/useCallApi'
import { AuthContext } from '../../contexts/AuthContext'
import IconReturn from '../../assets/icon-return.svg'
import { BiError } from 'react-icons/bi'
import { GoEyeClosed, GoEye } from 'react-icons/go'
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
      navigate(`/auth/verify/${user.id}`, { email: user.email })
    } else {
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
  }
  const onSubmit = (data) => {
    sendRequest(
      {
        data: data,
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_HOST}/api/auth/login`,
      },
      applyApi
    )
  }
  useEffect(() => {
    setErrorMessage(error?.response?.data?.message)
  }, [error])
  const changeShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className="flex items-center justify-center h-screen text-black">
      <Link to="/">
        <img
          src={IconReturn}
          alt=""
          className="cursor-pointer absolute top-10 left-20"
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
          <img src={Logo} alt="" className="w-[150px] h-auto object-cover" />
        </div>
        <div className="w-[80%]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="text-lg font-semibold ">Email address:</label>
            <br />
            <div
              className={`w-full rounded-md relative h-12 outline-none  overflow-hidden shadow-sm shadow-[#3333336d]   my-2 ${
                errors?.email && 'border-[2px] border-primary'
              } ${
                errorMessage === 'Email not valid!' &&
                'order-[2px] border-primary'
              }`}
            >
              <input
                onChange={() => setErrorMessage('')}
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
              <p className="text-primary">This field is required</p>
            )}
            {errors?.email?.type === 'pattern' && (
              <p className="text-primary">Invalid email!</p>
            )}
            {errorMessage === 'Email not valid!' && !errors?.email && (
              <span className="text-primary">Email is not registered!</span>
            )}
            <br />
            <label className="text-lg font-semibold">Password</label>
            <br />
            <div
              className={`w-full rounded-md h-12 shadow-sm shadow-[#3333336d] overflow-hidden relative my-2 ${
                errors?.password?.type && 'border-[2px] border-primary'
              } ${
                errorMessage === 'Incorrect password!' &&
                'order-[2px] border-primary'
              }`}
            >
              <input
                onChange={() => setErrorMessage('')}
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: true,
                  minLength: 8,
                })}
                className="w-[80%] h-full px-5 outline-none "
              />
              {errors?.password || errorMessage ? (
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
              <p className="text-primary">This field is required</p>
            )}
            {errors?.password?.type === 'minLength' && (
              <p className="text-primary">
                {' '}
                Password must be at least 8 characters
              </p>
            )}
            {errorMessage === 'Incorrect password!' && !errors?.password && (
              <span className="text-primary">Incorrect password!</span>
            )}
            <br />
            <button
              type="submit"
              className="rounded-[50px] shadow-sm shadow-black active:shadow-none bg-primary w-[130px] my-4 text-white py-1 text-[17px] font-roboto font-semibold"
            >
              LOGIN
            </button>
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
