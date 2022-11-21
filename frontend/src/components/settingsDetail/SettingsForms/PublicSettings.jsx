import { useForm } from 'react-hook-form'

import logo from '../../../assets/logo-icon-big.svg'
import FormButtons from './FormButtons'

const PublicSettings = ({ setValue }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    setValue(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center items-center">
        <img src={logo} className="w-32 h-32" alt="user-avatar" />
        <label
          htmlFor="profileImage"
          className="cursor-pointer text-center w-[100px] m-4 px-4 py-1 bg-gray-300 rounded-full text-text hover:shadow-md"
        >
          Change
        </label>
        <input
          {...register("profileImage", { required: true })}
          type="file"
          name="picture"
          id="profileImage"
          className="hidden"
        />
        {errors.profileImage && <span className="text-primary font-light">This field is required</span>}
      </div>
      <div className="flex flex-col mx-12 text-text text-lg font-medium">
        <label htmlFor="firstName">
          First name:
        </label>
        <input
          {...register("firstName", { required: true })}
          id="firstName"
          className="bg-white text-text font-normal outline-none border-gray-300 border-[2px] my-2 p-2 rounded-lg"
        />
        {errors.firstName && <span className="text-primary font-light">This field is required</span>}
        <label htmlFor="lastName">
          Last name:
        </label>
        <input
          {...register("lastName", { required: true })}
          id="lastName"
          className="bg-white text-text font-normal outline-none border-gray-300 border-[2px] my-2 p-2 rounded-lg"
        />
        {errors.lastName && <span className="text-primary font-light">This field is required</span>}
        <label htmlFor="username">
          User name:
        </label>
        <input
          {...register("username", { required: true })}
          id="userName"
          className="bg-white text-text font-normal outline-none border-gray-300 border-[2px] my-2 p-2 rounded-lg"
        />
        {errors.username && <span className="text-primary font-light">This field is required</span>}
      </div>
      <FormButtons />
    </form>
  )
}

export default PublicSettings