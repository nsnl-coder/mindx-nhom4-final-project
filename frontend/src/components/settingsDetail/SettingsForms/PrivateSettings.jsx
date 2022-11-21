import { useForm } from 'react-hook-form'

import FormButtons from './FormButtons'

const PrivateSettings = ({ setValue }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    setValue(data)
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mx-12 my-8 text-text text-lg font-medium">
        <label htmlFor="oldPassword">
          Old password:
        </label>
        <input
          {...register("oldPassword", { required: true })}
          type="password"
          id="oldPassword"
          className="form-control bg-white text-text font-normal outline-none border-gray-300 border-[2px] my-2 p-2 rounded-lg"
        />
        {errors.oldPassword && <span className="text-primary font-light">This field is required</span>}
        <label htmlFor="newPassword1">
          New password:
        </label>
        <input
          {...register("newPassword1", { required: true })}
          type="password"
          id="newPassword1"
          className="form-control bg-white text-text font-normal outline-none border-gray-300 border-[2px] my-2 p-2 rounded-lg"
        />
        {errors.newPassword1 && <span className="text-primary font-light">This field is required</span>}
        <label htmlFor="newPassword2">
          Repeat new password:
        </label>
        <input
          {...register("newPassword2", { required: true })}
          type="password"
          id="newPassword2"
          className="form-control bg-white text-text font-normal outline-none border-gray-300 border-[2px] my-2 p-2 rounded-lg"
        />
        {errors.newPassword2 && <span className="text-primary font-light">This field is required</span>}
      </div>
      <FormButtons />
    </form>
  )
}

export default PrivateSettings