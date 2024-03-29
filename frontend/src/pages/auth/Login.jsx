import { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Logo from '../../assets/logo-icon-big.svg'
import useCallApi from '../../hooks/useCallApi'
import { AuthContext } from '../../contexts/AuthContext'
import IconReturn from '../../assets/icon-return.svg'
import { BiError } from 'react-icons/bi'
import { GoEyeClosed, GoEye } from 'react-icons/go'
import { LoadingSpinner } from '../../components'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
  const { t } = useTranslation()
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
    if (!user.verified && user) {
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
  useEffect(() => {
    sendRequest({ url: `api/auth/login/success` }, applyApi2)
  }, [])
  useEffect(() => {
    setErrorMessage(error?.response?.data?.message)
  }, [error])

  return (
    <div className="flex items-center justify-center h-screen text-text shadow-md">
      <Link to="/">
        <img
          src={IconReturn}
          alt=""
          className="cursor-pointer absolute md:top-10 md:left-20 top-5 left-5"
        />
      </Link>
      <div className="w-[550px] shadow-lg rounded-md p-10 mt-10">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-text mb-5">
              {t('welcome-title-login')}
            </h1>
            <p className="text-dark-gray"> {t('welcome-content-login')}</p>
          </div>
          <img
            src={Logo}
            alt=""
            className="md:w-[150px] w-[100px] h-[100px] md:h-auto object-cover"
          />
        </div>
        <div className="md:w-[80%] w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="text-lg font-semibold "> {t('email')}:</label>
            <br />
            <div
              className={`w-full rounded-md  relative h-12 outline-none  overflow-hidden shadow-md  my-2 ${
                errors?.email && 'border-[2px] border-primary'
              } ${
                errorMessage === 'Email is not registered!' &&
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
              {(errors?.email ||
                errorMessage === 'Email is not registered!') && (
                <BiError className="absolute top-[50%] text-xl right-6 -translate-y-[50%] text-primary" />
              )}
            </div>
            {errors?.email?.type === 'required' && (
              <p className="text-primary text-sm">{t('this-feild-required')}</p>
            )}
            {errors?.email?.type === 'pattern' && (
              <p className="text-primary text-sm">{t('invalid-email')}</p>
            )}
            {!errors?.email?.type &&
              errorMessage === 'Email is not registered!' &&
              !errors?.email && (
                <span className="text-primary text-sm">
                  {t('email-not-register')}
                </span>
              )}
            <br />
            <label className="text-lg font-semibold"> {t('password')}</label>
            <br />
            <div
              className={`w-full rounded-md h-12 shadow-md overflow-hidden relative my-2 ${
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
              <p className="text-primary text-sm">{t('this-feild-required')}</p>
            )}
            {errors?.password?.type === 'minLength' && (
              <p className="text-primary text-sm"> {t('minLength-password')}</p>
            )}
            {!errors?.password?.type &&
              errorMessage === 'Incorrect password!' &&
              !errors?.password && (
                <span className="text-primary texl-sm">
                  {t('incorrectPass')}
                </span>
              )}
            <br />
            <button
              disabled={isLoading ? true : false}
              type="submit"
              className="rounded-[50px] relative h-[40px] disabled:opacity-50 shadow-md active:shadow-none bg-primary w-[130px] my-4 text-white py-1 text-[17px] font-roboto font-semibold"
            >
              {isLoading ? (
                <span className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[65%]">
                  <LoadingSpinner />
                </span>
              ) : (
                t('login')
              )}
            </button>
          </form>
          <p className="text-center text-lg mb-3"> {t('or')}</p>
          <a href={`${import.meta.env.VITE_BACKEND_HOST}/api/auth/google`}>
            <button className="w-full h-[50px] gap-4 mb-3 rounded-md flex items-center justify-center border-[2px] border-green-800">
              <FcGoogle className="text-3xl" />
              <span className="font-semibold">{t('signIn-gg')}</span>
            </button>
          </a>
          <p className="font-[600] text-[17px] mb-4">
            {t('link-to-register')}{' '}
            <Link
              to="/auth/register"
              className="text-primary text-lg cursor-pointer underline uppercase"
            >
              {t('create-new')}
            </Link>{' '}
            {t('now')}
          </p>
          <Link to="/auth/forgot">
            {' '}
            <p className="text-[#333] text-lg font-semibold hover:underline cursor-pointer">
              {t('fotgot')}
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
