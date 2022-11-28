import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import userCallApi from '../../hooks/useCallApi'
import Logo from '../../assets/logo-icon-big.svg'
import IconReturn from '../../assets/icon-return.svg'
import { GoEyeClosed, GoEye } from 'react-icons/go'
import { BiError } from 'react-icons/bi'

const Register = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const { isLoading, error, sendRequest } = userCallApi()
  const [errorMessage, setErrorMessage] = useState(error)
  const [showPassword, setShowPassword] = useState(false)
  const applyApiData = (datas) => {
    console.log(datas)
    navigate(`/auth/verify/${datas._id}`, { state: { email: datas.email } })
  }
  const onSubmit = (data) => {
    sendRequest(
      {
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_HOST}/api/auth/register`,
        data: data,
      },
      applyApiData
    )
  }
  const changeShowPassword = () => {
    setShowPassword(!showPassword)
  }
  useEffect(() => {
    setErrorMessage(error?.response?.data?.message)
  }, [error])
  return (
    <>
      <Link to="/">
        <img
          src={IconReturn}
          alt=""
          className="cursor-pointer absolute md:top-10 md:left-20 top-0 left-0"
        />
      </Link>
      <div className="flex items-center justify-center h-screen text-black">
        <div className="md:w-[550px] w-[400px] shadow-md shadow-gray rounded-md p-2 md:p-10 border-[1px] border-gray">
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-black  mb-5">
                Sign Up
              </h1>
              <p className="text-dark-gray">We're happy to see you here!</p>
            </div>
            <img
              src={Logo}
              alt=""
              className="md:w-[150px] w-[80px] h-[80px]  md:h-auto object-cover"
            />
          </div>
          <div className="w-[80%]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between flex-wrap ">
                <div className="md:w-[48%] w-full ">
                  <label className="text-lg font-semibold ">First Name:</label>

                  <div
                    className={`w-full outline-none relative rounded-md h-12 overflow-hidden  shadow-sm shadow-[#3333336d]  my-2 ${
                      errors?.firstName?.type && 'border-primary border-[2px]'
                    } `}
                  >
                    <input
                      onChange={() => setErrorMessage('')}
                      {...register('firstName', {
                        required: true,
                        maxLength: 20,
                        pattern: /^[A-Za-z]+$/i,
                      })}
                      className="w-full h-full pr-14 pl-4 outline-none"
                    />
                    {errors?.firstName && (
                      <BiError className="absolute top-[50%] text-xl right-6 md:right-2 -translate-y-[50%] text-primary" />
                    )}
                  </div>
                  {errors?.firstName?.type === 'required' && (
                    <span className="text-primary text-sm">
                      This field is required
                    </span>
                  )}
                  {errors?.firstName?.type === 'maxLength' && (
                    <span className="text-primary text-sm">
                      Cannot exceed 20 characters
                    </span>
                  )}
                  {errors?.firstName?.type === 'pattern' && (
                    <span className="text-primary text-sm">
                      First Name Invalid !
                    </span>
                  )}
                </div>
                <div className="md:w-[48%] w-full ">
                  <label className="text-lg font-semibold ">Last Name:</label>
                  <br />
                  <div
                    className={` outline-none relative rounded-md h-12 overflow-hidden  shadow-sm shadow-[#3333336d]  my-2 ${
                      errors?.lastName?.type && 'border-primary border-[2px]'
                    } `}
                  >
                    <input
                      onChange={() => setErrorMessage('')}
                      {...register('lastName', {
                        required: true,
                        pattern: /^[A-Za-z]+$/i,
                        maxLength: 20,
                      })}
                      className="w-full h-full pr-14 pl-4 outline-none"
                    />
                    {errors?.lastName?.type && (
                      <BiError className="absolute top-[50%] text-xl md:right-2 right-6 -translate-y-[50%] text-primary" />
                    )}
                  </div>
                  {errors?.lastName?.type === 'required' && (
                    <span className="text-primary text-sm">
                      This field is required!
                    </span>
                  )}
                  {errors?.lastName?.type === 'maxLength' && (
                    <span className="text-primary text-sm">
                      {' '}
                      Cannot exceed 20 characters!
                    </span>
                  )}
                  {errors?.lastName?.type === 'pattern' && (
                    <span className="text-primary text-sm">
                      Last Name Invalid!
                    </span>
                  )}
                </div>
              </div>
              <label className="text-lg font-semibold ">User Name:</label>
              <br />
              <div
                className={`w-full outline-none relative rounded-md h-12 overflow-hidden  shadow-sm shadow-[#3333336d]  my-2 ${
                  errors?.username?.type && 'border-primary border-[2px]'
                } ${
                  errorMessage === 'User with given username already Exist!' &&
                  'border-primary border-[2px]'
                }`}
              >
                <input
                  onChange={() => setErrorMessage('')}
                  {...register('username', {
                    required: true,
                    minLength: 5,
                    maxLength: 20,
                    pattern: /^[a-zA-Z0-9]+$/,
                  })}
                  className="w-full h-full pr-14 pl-4 outline-none"
                />
                {(errors?.username ||
                  errorMessage ===
                    'User with given username already Exist!') && (
                  <BiError className="absolute top-[50%] text-xl right-6 -translate-y-[50%] text-primary" />
                )}
              </div>
              {errors?.username?.type === 'required' && (
                <span className="text-primary text-sm">
                  This field is required
                </span>
              )}
              {errors?.username?.type === 'minLength' && (
                <span className="text-primary text-sm">
                  User Name must be at least 5 characters
                </span>
              )}
              {errors?.username?.type === 'maxLength' && (
                <span className="text-primary text-sm">
                  User Name cannot axceed 20 characters
                </span>
              )}
              {errors?.username?.type === 'pattern' && (
                <span className="text-primary text-sm">UserName Invalid!</span>
              )}
              {errorMessage === 'User with given username already Exist!' &&
                !errors?.username && (
                  <span className="text-primary text-sm">
                    User with given username already Exist!
                  </span>
                )}

              <br />
              <label className="text-lg font-semibold ">Email address:</label>
              <br />
              <div
                className={`w-full outline-none overflow-hidden rounded-md h-12  shadow-sm shadow-[#3333336d] relative my-2 ${
                  errors?.email?.type && 'border-primary border-[2px]'
                } ${
                  errorMessage === 'User with given email already Exist!' &&
                  'border-[2px] border-primary'
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
                  className="outline-none w-full h-full pr-14 pl-4"
                />
                {(errors?.email ||
                  errorMessage === 'User with given email already Exist!') && (
                  <BiError className="absolute top-[50%] text-xl right-6 -translate-y-[50%] text-primary" />
                )}
              </div>
              {errors?.email?.type === 'required' && (
                <span className="text-primary text-sm">
                  This field is required
                </span>
              )}
              {errors?.email?.type === 'pattern' && (
                <span className="primary">Invalid email!</span>
              )}
              {errorMessage === 'User with given email already Exist!' && (
                <span className="text-primary text-sm">
                  User with given username already Exist!
                </span>
              )}
              <br />
              <label className="text-lg font-semibold">Password</label>
              <br />
              <div
                className={`w-full rounded-md relative outline-none h-12 overflow-hidden shadow-sm shadow-[#3333336d]  my-2 ${
                  errors?.password?.type && 'border-primary border-[2px]'
                }`}
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: true,
                    minLength: 8,
                  })}
                  className="w-full h-full pl-4 pr-14 outline-none"
                />
                {errors?.password ? (
                  <BiError className="absolute top-[50%] text-xl right-6 -translate-y-[50%] text-primary" />
                ) : (
                  <div
                    className="absolute top-[50%] text-xl right-6 -translate-y-[50%]"
                    onClick={changeShowPassword}
                  >
                    {showPassword ? <GoEyeClosed /> : <GoEye />}
                  </div>
                )}
              </div>
              {errors?.password?.type === 'required' && (
                <span className="text-primary text-sm">
                  This field is required
                </span>
              )}
              {errors?.password?.type === 'minLength' && (
                <span className="text-primary text-sm">
                  Email must be at least 8 characters
                </span>
              )}

              <br />
              <button
                type="submit"
                className="rounded-[50px] shadow-sm active:shadow-none shadow-black bg-primary w-[130px] md:my-4 my-2 text-white py-1 text-[17px] font-roboto font-semibold"
              >
                SIGN UP
              </button>
              <p className="font-[600] text-[17px] mb-4">
                Already Have An Account?{' '}
                <Link to="/auth/login">
                  {' '}
                  <span className="text-primary text-lg cursor-pointer underline">
                    LOG IN{' '}
                  </span>
                </Link>
                now!
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
