import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Logo from '../../assets/logo-icon-big.svg'
import useCallApi from '../../hooks/useCallApi'
import { AuthContext } from '../../contexts/AuthContext'
import IconReturn from '../../assets/icon-return.svg'
const Login = () => {
  const navigate = useNavigate()
  const { isLoading, error, sendRequest } = useCallApi()
  const { setAuth } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState('')
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
            <input
              type="email"
              {...register('email', {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              onChange={() => setErrorMessage('')}
              className={`w-full rounded-md h-12 outline-none  px-4 shadow-sm shadow-[#3333336d] border-[1px] border-[#3333333f]  my-2 ${
                errors?.email && 'border-[2px] border-primary'
              } ${
                errorMessage === 'Email not valid!' &&
                'order-[2px] border-primary'
              }`}
            />
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
            <input
              type="password"
              {...register('password', {
                required: true,
              })}
              onChange={() => setErrorMessage('')}
              className={`w-full rounded-md h-12 px-4 shadow-sm shadow-[#3333336d] border-[1px] border-[#3333333f] my-2 ${
                errors?.password && 'border-[2px] border-primary'
              } ${
                errorMessage === 'Incorrect password!' &&
                'order-[2px] border-primary'
              }`}
            />
            {errors?.password?.type === 'required' && (
              <p className="text-primary">This field is required</p>
            )}
            {errorMessage === 'Incorrect password!' && !errors?.password && (
              <span className="text-primary">Incorrect password!</span>
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
            <Link to="/auth/forgot">
              {' '}
              <p className="text-black font-semibold hover:underline cursor-pointer">
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
